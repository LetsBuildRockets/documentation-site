const express = require('express');
const next = require('next');
const schedule = require('node-schedule');
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

var rule = new schedule.RecurrenceRule();
rule.hour = 0;
schedule.scheduleJob({hour: 0}, autoUpdate);

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

  server.get('/api/users/id/:id', function (req, res) {
    db.getUser(req.params.id).then(function(user) {
      res.json(user);
    });
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
