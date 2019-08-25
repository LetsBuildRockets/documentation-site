var pg = require('pg')
var KnexQueryBuilder = require('knex/lib/query/builder')
var Promise = require('bluebird')

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'debian-webdev',
    database: 'postgres',
    user: 'postgres',
    password: 'idk-a-pword',
    port: '5444'
  }
})

exports.knex = knex

KnexQueryBuilder.prototype.auth = (username, password) => {
  return this.whereRaw('username = ? AND password = crypt(?, password)', [username, password])
}
knex.queryBuilder = () => {
  return new KnexQueryBuilder(knex.client)
}

// Functions to get info from the database:

exports.allArticles = () => {
  return knex('articles').select('title', 'url_slug', 'abstract', 'id')
}

exports.allProjects = () => {
  return knex('articles').where({ type: 'project' }).select('title', 'url_slug', 'abstract')
}

exports.allFiles = () => {
  return knex('files').select('*')
}

exports.allUsers = () => {
  return knex('users')
    .select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug')
    .leftJoin('articles', 'users.article_id', 'articles.id')
}

exports.getArticle = (slug) => {
  return knex('articles').select(
    'articles.id',
    'articles.title',
    'articles.date',
    'articles.author_id',
    'users.first_name AS author_first_name',
    'users.last_name AS author_last_name',
    'users.username AS author_username',
    'user_article.url_slug AS author_url_slug',
    'articles.content',
    'articles.needed_tags',
    'articles.tags',
    'articles.abstract',
    'articles.type',
    'articles.thumbnail',
    'articles.url_slug',
    'articles.major_rev',
    'articles.minor_rev',
    'articles.revision_state')
    .leftJoin('users', 'articles.author_id', 'users.id')
    .leftJoin('articles AS user_article', 'articles.author_id', 'user_article.id')
    .where({ 'articles.url_slug': slug })
    .orderBy('articles.major_rev', 'desc')
    .orderBy('articles.minor_rev', 'desc')
    .orderBy('articles.date', 'desc')
    .limit(1)
}

exports.getArticleByID = (aid) => {
  return knex('articles').select(
    'articles.id',
    'articles.title',
    'articles.date',
    'articles.author_id',
    'users.first_name AS author_first_name',
    'users.last_name AS author_last_name',
    'users.username AS author_username',
    'user_article.url_slug AS author_url_slug',
    'articles.content',
    'articles.needed_tags',
    'articles.tags',
    'articles.abstract',
    'articles.type',
    'articles.thumbnail',
    'articles.url_slug',
    'articles.major_rev',
    'articles.minor_rev',
    'articles.revision_state')
    .leftJoin('users', 'articles.author_id', 'users.id')
    .leftJoin('articles AS user_article', 'articles.author_id', 'user_article.id')
    .where({ 'articles.id': aid })
    .orderBy('articles.major_rev', 'desc')
    .orderBy('articles.minor_rev', 'desc')
    .orderBy('articles.date', 'desc')
    .limit(1)
}

function articleExists (slug, callback) {
  knex('articles').where({ url_slug: slug }).select('*').then((article) => {
    var exists = (article.length > 0)
    callback(exists)
  })
}
exports.articleExists = articleExists

exports.getFile = (slug) => {
  return knex('files').where({ url_slug: slug }).select('*')
}

exports.getFileByID = (fid) => {
  return knex('files').where({ id: fid }).select('*')
}
/* TODO: Make this work
exports.getRelatedFiles = (aid) => {
  var needed_tags = knex('articles').where({id: aid}).select('needed_tags')
  return knex('files').whereIn(tags, needed_tags[0]).select('id', 'name', 'file_type', 'url_slug')
}
*/
exports.getFilesOfMimetype = (type) => {
  return knex('files').where({ mimetype: type }).select('*')
}

exports.getFilesWithExtension = (extension) => {
  return knex('files').where({ extension: extension }).select('*')
}

exports.fileExists = function fileExists (slug, callback) {
  knex('files').where({ url_slug: slug }).select('*').then((file) => {
    var exists = (file.length > 0)
    callback(exists)
  })
}

exports.getUser = (id) => {
  return knex('users')
    .where({ 'users.id': id })
    .select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug')
    .leftJoin('articles', 'users.article_id', 'articles.id')
}

exports.getUserIDByUsername = (username) => {
  return knex('users').where({ username: username }).select('id')
}

function userExists (username, callback) {
  knex('users').where({ username: username }).select('*').then((user) => {
    var exists = (user.length > 0)
    callback(exists)
  })
}
exports.userExists = userExists

function authUser (username, password, callback) {
  knex('users').auth(username, password).then((user) => {
    callback(user)
  })
}
exports.authUser = authUser

// Functions to edit info in the database:

exports.editUser = (data) => {
  userExists(data.username, (exists) => {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('users')
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    } else {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('users')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}

exports.editArticle = (data) => {
  articleExists(data.url_slug, (exists) => {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('articles')
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    } else {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('articles')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}

exports.editFile = (data) => {
  fileExists(data.url_slug, (exists) => {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('files')
          .where({ url_slug: data.url_slug })
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    } else {
      // Using trx as a transaction object:
      knex.transaction((trx) => {
        knex('files')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback)
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}
