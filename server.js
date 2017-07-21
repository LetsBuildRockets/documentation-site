const express = require('express')
const next = require('next')
const db = require('./database');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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
