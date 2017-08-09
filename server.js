const express = require('express')
const next = require('next')
const db = require('./database');
const gdrive = require('./gdrive.js');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// gdrive.getFile('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', function(data) {
//   console.log(data);
// });
//
// gdrive.setFileTitle('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'Parachute Calculations');
//
// gdrive.setFileDescription('0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ', 'These are some cool calculations!');
//
// gdrive.getFiles('0BwFaRrEmPx2yNjZFYzQ5X2t6X0k', function(data) {
//   console.log(data.items);
//   console.log(data.items.length);
// })

setInterval(autoUpdate, 60000);

function autoUpdate() {
  const dbSync = require('./dbSync.js');
  dbSync.update();
}

app.prepare()
.then(() => {
  const server = express()

  server.get('/a/:slug', (req, res) => {
    const actualPage = '/article'
    const queryParams = { slug: req.params.slug}
    app.render(req, res, actualPage, queryParams);
  })

  server.get('/api/users', function (req, res) {
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

  server.get('/api/users/:id', function (req, res) {
    db.getUser(req.params.id).then(function(user) {
      res.json(user);
    });
  });

  server.get('/api/files', function (req, res) {
    db.allFiles().then(function(files) {
      res.json(files);
    });
  });

  // server.post('/api/createuser', urlencodedParser, function (req, res) {
  //   req.body.first_name
  //
  //   db.allArticles().then(function(articles) {
  //     res.json(articles);
  //   });
  // });

  server.use(express.static("static"));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
