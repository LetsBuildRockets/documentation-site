var pg = require('pg');
var Promise = require('bluebird');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '73.47.211.152',
    database : 'postgres',
    user : 'postgres',
    password : 'idk-a-pword',
    port: '5444'
  }
});

exports.knex = knex;


// Functions to get info from the database:

exports.allArticles = function() {
  return knex('articles').select('title','url_slug','abstract');
}

exports.allProjects = function() {
  return knex('articles').where({type: project}).select('title','url_slug','abstract');
}

exports.allFiles = function() {
  return knex('files').select('*');
}

exports.allUsers = function() {
  return knex('users').select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug').leftJoin('articles', 'users.article_id', 'articles.id');
}

exports.getRelatedFiles = function(aid) {
  var needed_tags = knex('articles').where({id: aid}).select('needed_tags');
  return knex('files').whereIn(tags, needed_tags[0]).select('id', 'name', 'file_type', 'url_slug');
}

exports.getFilesOfType = function(type) {
  return knex('files').where({file_type: type}).select('*');
}

exports.getArticle = function(slug) {
  return knex('articles').where({url_slug: slug}).select('*');
}

exports.getArticleByID = function(aid) {
  return knex('articles').where({id: aid}).select('*');
}

exports.getFile = function(fid) {
  return knex('files').where({id: fid}).select('*');
}

exports.getUser = function(uid) {
  return knex('users').where({'users.id': uid}).select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug').leftJoin('articles', 'users.article_id', 'articles.id');
}

exports.verifyUser = function(username, password) {
  return username == username
}


// Functions to edit info in the database:

exports.createUser = function(username, first_name, last_name, article_id, profile_picture) {
  // Using trx as a transaction object:
  knex.transaction(function(trx) {
    knex.insert({
      username: username,
      first_name: first_name,
      last_name: last_name,
      article_id: article_id,
      profile_picture: profile_picture
    })
      .into('users')
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch(function(error) {
    console.error(error);
  });
}

exports.createArticle = function(title, date, author_id, content, needed_tags, tags, abtract, project_page, thumbnail, url_slug) {
  // Using trx as a transaction object:
  knex.transaction(function(trx) {
    knex.insert({
      title: title,
      date: date,
      author_id: author_id,
      content: content,
      needed_tags: needed_tags,
      tags: tags,
      abtract: abstract,
      project_page: project_page,
      thumbnail: thumbnail,
      url_slug: url_slug
    })
      .into('articles')
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch(function(error) {
    console.error(error);
  });
}

exports.addFile = function(name, file_type, date_modified, date_created, tags, description, thumbnail_data, url_slug) {
  // Using trx as a transaction object:
  knex.transaction(function(trx) {
    knex.insert({
      name: name,
      file_type: file_type,
      date_modified: date_modified,
      date_created: date_created,
      tags: tags,
      description: description,
      thumbnail_data: thumbnail_data,
      url_slug: url_slug
    })
      .into('articles')
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  })
  .catch(function(error) {
    console.error(error);
  });
}
