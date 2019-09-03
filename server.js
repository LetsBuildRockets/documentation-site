const express = require('express')
const next = require('next')
const schedule = require('node-schedule')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const https = require('https')
const fs = require('fs')
const session = require('express-session')
const cors = require('cors')
const serveIndex = require('serve-index')
const db = require('./database')
const gdrive = require('./gdrive.js')
const uuidv1 = require('uuid/v1')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const host = process.env.REACT_APP_BASE_URL || 'localhost';

const app = next({ dev })
const handle = app.getRequestHandler()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// gdrive.getFile('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', function(data) {
//   console.log(data)
// })

//gdrive.setFileTitle('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'Parachute Calculations')

//gdrive.setFileDescription('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'These are some cool calculations!')

// gdrive.getFiles('0BwFaRrEmPx2yNjZFYzQ5X2t6X0k', function(data) {
//   console.log(data.items)
//   console.log(data.items.length)
// })

var rule = new schedule.RecurrenceRule()
rule.hour = 0
schedule.scheduleJob({ hour: 0 }, autoUpdate)

function autoUpdate () {
  const dbSync = require('./dbSync.js')
  dbSync.update()
}

var auth = function (req, res, next) {
  if (req.session && req.cookies.user_sid) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}

var authAdmin = function (req, res, next) {
  if (req.session && req.cookies.user_sid && req.session.admin) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}

app.prepare()
  .then(() => {
    const server = express()
    const staticServer = express()
    https.createServer({
      key: (fs.existsSync(process.env.PRI_KEY_FILE) ? fs.readFileSync(process.env.PRI_KEY_FILE, 'utf8') : ''),
      cert: (fs.existsSync(process.env.CERT_FILE) ? fs.readFileSync(process.env.CERT_FILE, 'utf8') : ''),
      ca: (fs.existsSync(process.env.CA_FILE) ? fs.readFileSync(rocess.env.CA_FILE, 'utf8') : '')
    }, server).listen(443, err => {
      if (err) throw err
      // eslint-disable-next-line no-console
      console.log(`> Ready on https://${host}:443`)
    })

    server.use(session({
      genid: function(req) {
        return uuidv1() // use UUIDs for session IDs
      },
      key: 'user_sid',
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: false
    }))

    server.use(cookieParser());
    server.use((req, res, next) => {
      if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
      }
      next();
    });

    server.use(cors())
    server.use(express.static('static'))
    server.use(bodyParser.json())
    server.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

    staticServer.use('/static', express.static('static'), serveIndex('static'));
    staticServer.use('/.well-known', express.static('.well-known'), serveIndex('.well-known'));

    server.get('/a/:slug', (req, res) => {
      const actualPage = '/article'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/edit/:slug', (req, res) => {
      const actualPage = '/edit'
      const queryParams = { slug: req.params.slug }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/api/users', authAdmin, (req, res) => {
      db.allUsers().then((users) => {
        res.json(users)
      })
    })

    server.get('/api/articles', (req, res) => {
      db.allArticles().then((articles) => {
        res.json(articles)
      })
    })

    server.get('/api/articles/:slug', (req, res) => {
      db.getArticle(req.params.slug).then((article) => {
        res.json(article)
      })
    })

    server.get('/api/users/id/:id', (req, res) => {
      db.getUser(req.params.id).then((user) => {
        res.json(user)
      })
    })

    server.get('/api/users/me', (req, res) => {
      if (typeof req.session.user !== 'undefined') {
        res.json(req.session.user)
      } else {
        res.json({})
      }
    })

    server.get('/api/users/username/:username', (req, res) => {
      db.getUserIDByUsername(req.params.username).then((userID) => {
        res.json(userID)
      })
    })

    server.get('/api/files', (req, res) => {
      db.allFiles().then((files) => {
        res.json(files)
      })
    })

    server.get('/api/files/:slug', (req, res) => {
      db.getFile(req.params.slug).then((file) => {
        res.json(file)
      })
    })

    server.post('/api/edit/article', (req, res) => {
      console.log(req.body)

      db.editArticle()

      res.send('Success!')
    })

    server.post('/api/login', (req, res) => {
      // console.log(req.body)

      db.authUser(req.body.username, req.body.password, (user) => {
        if (user.length > 0) {
          req.session.user = {}
          req.session.user.username = user[0].username
          req.session.user.first_name = user[0].first_name
          req.session.user.last_name = user[0].last_name
          req.session.admin = true
          // console.log(req.session)
          res.status(201)
          res.send('Login Success!')
        } else {
          res.status(401)
          res.send('Incorrect Username/Password!')
        }
      })
    })

    server.get('/api/logout', (req, res) => {
      res.clearCookie('user_sid');
      res.redirect('/');
      req.session.destroy()
      //res.send('logout success!')
    })

    server.post('/api/edit/user', (req, res) => {
      console.log(req.body)
      if (req.body.first_name === '') {
        res.status(400)
        res.send('first name must not be blank!')
      } else if (req.body.last_name === '') {
        res.status(400)
        res.send('last must not be blank!')
      } else if (req.body.username === '') {
        res.status(400)
        res.send('username must not be blank!')
      } else if (req.body.has_article === '') {
        res.status(400)
        res.send('please select if the user has an article already!')
      } else {
        db.userExists(req.body.username, (exists) => {
          if (exists) {
            res.status(400)
            res.send('username already exists!')
          } else {
            db.editUser()
            res.status(201)
            res.send('winner winner chkicken dinner!')
          }
        })
      }

      // db.editArticle()
    })

    server.get('/api/exists/article/:slug', (req, res) => {
      db.articleExists(req.params.slug, (exists) => {
        res.send(exists)
      })
    })

    server.get('/api/exists/user/:username', (req, res) => {
      db.userExists(req.params.username, (exists) => {
        res.send(exists)
      })
    })

    server.get('/api/exists/file/:slug', (req, res) => {
      db.fileExists(req.params.slug, (exists) => {
        res.send(exists)
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    staticServer.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${host}:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
