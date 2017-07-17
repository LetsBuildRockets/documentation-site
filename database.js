var pg = require('pg');

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

exports.allArticles = function() {
  return knex('articles').select('title','url','abstract');
}

exports.allProjects = function() {
  return knex('articles').where({mainProjectPage: true}).select('title','url','abstract');
}

exports.allFiles = function() {
  return knex('files').select('*');
}

exports.allUsers = function() {
  return knex('users').select('*');
}

exports.firstUser = function() {
  return knex('users').first('*');
}

exports.getArticleContent = function(aid) {
  return knex('articles').where({id: aid}).select('*');
}

exports.getRelatedFiles = function(aid) {
  var neededTags = knex('articles').where({id: aid}).select('neededTags');
  return knex('files').whereIn(tags, neededTags[0]).select('id', 'name', 'fileType', 'url');
}

exports.getFilesOfType = function(type) {
  return knex('files').where({fileType: type}).select('*');
}

exports.getFileContent = function(fid) {
  return knex('files').where({id: aid}).select('*');
}

exports.getUserContent = function(uid) {
  return knex('users').where({id: uid}).select('*');
}
