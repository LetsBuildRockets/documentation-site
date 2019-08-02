const express = require('express');
const next = require('next');
const schedule = require('node-schedule');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs')
const session = require('express-session');
const cors = require('cors')

const db = require('./database');
const gdrive = require('./gdrive.js');
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// gdrive.getFile('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', function(data) {
//   console.log(data);
// });

//gdrive.setFileTitle('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'Parachute Calculations');

//gdrive.setFileDescription('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'These are some cool calculations!');

// gdrive.getFiles('0BwFaRrEmPx2yNjZFYzQ5X2t6X0k', function(data) {
//   console.log(data.items);
//   console.log(data.items.length);
// })

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
schedule.scheduleJob({hour: 0}, autoUpdate);

function autoUpdate() {
  const dbSync = require('./dbSync.js');
  dbSync.update();
}

var auth = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};

app.prepare()
.then(() => {
  const server = express()
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, server).listen(443, err => {
			if (err) throw err
			// eslint-disable-next-line no-console
			console.log('> Ready on https://localhost:8000')
	})

  server.use(session({
  	secret: 'super-secret',
  	resave: true,
  	saveUninitialized: true
  }));

  server.use(cors())
  server.use(express.static("static"));
  server.use(bodyParser.json());

  server.get('/a/:slug', (req, res) => {
    const actualPage = '/article'
    const queryParams = { slug: req.params.slug}
    app.render(req, res, actualPage, queryParams);
  })

  server.get('/api/users', auth, function (req, res) {
    db.allUsers().then(function(users) {
      res.json(users);
    });
  });

  server.get('/api/articles', function (req, res) {
    db.allArticles().then(function(articles) {
      res.json(articles);
    });
  });

  server.get('/api/articles/:slug', function (req, res) {
    db.getArticle(req.params.slug).then(function(article) {
      res.json(article);
    });
  });

  server.get('/api/users/id/:id', function (req, res) {
    db.getUser(req.params.id).then(function(user) {
      res.json(user);
    });
  });


  server.get('/api/users/me', function (req, res) {
    if(typeof req.session.user !== 'undefined') {
      console.log("user data:" + req.session.user);
      res.json(req.session.user);
    } else {
      res.json({});
    }
  });

  server.get('/api/users/username/:username', function (req, res) {
    db.getUserIDByUsername(req.params.username).then(function(userID) {
      res.json(userID);
    });
  });

  server.get('/api/files', function (req, res) {
    db.allFiles().then(function(files) {
      res.json(files);
    });
  });

  server.get('/api/files/:slug', function (req, res) {
    db.getFile(req.params.slug).then(function(file) {
      res.json(file);
    });
  });

  server.post('/api/edit/article', function (req, res) {
    console.log(req.body);

    // db.editArticle()

    res.send("Success!");
  });

  server.post('/api/login', function (req, res) {
    console.log(req.body);

    db.authUser(req.body.username, req.body.password, function(user) {
      if(user.length > 0) {
        req.session.user = {};
        req.session.user.username = user[0].username;
        req.session.user.first_name = user[0].first_name;
        req.session.user.last_name = user[0].last_name;
        req.session.admin = true;
        res.status(201);
        res.send("login success!");
      } else {
        res.status(401);
        res.send("Incorrect Username/Password!");
      }
    });
  });

  server.get('/api/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
  });

  server.post('/api/edit/user', function (req, res) {
    console.log(req.body);
    if(req.body.first_name == "") {
      res.status(400);
      res.send("first name must not be blank!");
      return
    } else if(req.body.last_name == "") {
      res.status(400);
      res.send("last must not be blank!");
      return
    } else if(req.body.username == "") {
      res.status(400);
      res.send("username must not be blank!");
      return
    } else if(req.body.has_article == '') {
      res.status(400);
      res.send("please select if the user has an article already!");
      return
    } else {
      db.userExists(req.body.username, function(exists) {
        if(exists) {
          res.status(400);
          res.send("username already exists!");
        } else {
          db.editUser()
          res.status(201)
          res.send("winner winner chkicken dinner!");
        }
      })
    }

    // db.editArticle()
  });

  server.get('/api/exists/article/:slug', function (req, res) {
    db.articleExists(req.params.slug, function(exists) {
      res.send(exists);
    })
  });

  server.get('/api/exists/user/:username', function (req, res) {
    db.userExists(req.params.username, function(exists) {
      res.send(exists);
    })
  });

  server.get('/api/exists/file/:slug', function (req, res) {
    db.fileExists(req.params.slug, function(exists) {
      res.send(exists);
    })
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  // server.listen(80, (err) => {
  //   if (err) throw err
  //   console.log('> Ready on https://localhost')
  // })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
