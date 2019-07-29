var pg = require('pg');
var KnexQueryBuilder = require('knex/lib/query/builder');
var Promise = require('bluebird');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '192.168.2.128',
    database : 'postgres',
    user : 'postgres',
    password : 'idk-a-pword',
    port: '5444'
  }
});

exports.knex = knex;

KnexQueryBuilder.prototype.auth = function(username, password){
	return this.whereRaw("username = ? AND password = crypt(?, password)", [username, password]);
  //AND password = crpyt(??, password)
};
knex.queryBuilder = function(){
	return new KnexQueryBuilder(knex.client);
};
// Functions to get info from the database:

exports.allArticles = function() {
  return knex('articles').select('title','url_slug','abstract','id');
}

exports.allProjects = function() {
  return knex('articles').where({type: 'project'}).select('title','url_slug','abstract');
}

exports.allFiles = function() {
  return knex('files').select('*');
}

exports.allUsers = function() {
  return knex('users').select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug').leftJoin('articles', 'users.article_id', 'articles.id');
}

exports.getArticle = function(slug) {
  return knex('articles').where({url_slug: slug}).select('*');
}

exports.getArticleByID = function(aid) {
  return knex('articles').where({id: aid}).select('*');
}

function articleExists(slug, callback) {
  knex('articles').where({url_slug: slug}).select('*').then(function(article) {
    var exists = (article.length > 0);
    callback(exists);
  });
}
exports.articleExists = articleExists;

exports.getFile = function(slug) {
  return knex('files').where({url_slug: slug}).select('*');
}

exports.getFileByID = function(fid) {
  return knex('files').where({id: fid}).select('*');
}
/* TODO: Make this work
exports.getRelatedFiles = function(aid) {
  var needed_tags = knex('articles').where({id: aid}).select('needed_tags');
  return knex('files').whereIn(tags, needed_tags[0]).select('id', 'name', 'file_type', 'url_slug');
}
*/
exports.getFilesOfMimetype = function(type) {
  return knex('files').where({mimetype: type}).select('*');
}

exports.getFilesWithExtension = function(extension) {
  return knex('files').where({extension: extension}).select('*');
}

function fileExists(slug, callback) {
  knex('files').where({url_slug: slug}).select('*').then(function(file) {
    var exists = (file.length > 0);
    callback(exists);
  });
}
exports.fileExists = fileExists;

exports.getUser = function(uid) {
  return knex('users').where({'users.id': uid}).select('users.username', 'users.first_name', 'users.last_name', 'users.article_id', 'users.profile_picture', 'articles.url_slug').leftJoin('articles', 'users.article_id', 'articles.id');
}

exports.getUserIDByUsername = function(username) {
  return knex('users').where({username: username}).select('id');
}

exports.userExists =function userExists(username, callback) {
  knex('users').where({username: username}).select('*').then(function(user) {
    var exists = (user.length > 0);
    callback(exists);
  });
}

exports.authUser =function authUser(username, password, callback) {
  knex('users').auth(username, password).then(function(user) {
    //var exists = (user.length > 0);
    //callback(exists);
    callback(user)
  });
}


// Functions to edit info in the database:

exports.editUser = function(data) {
  userExists(data.username, function(exists) {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('users')
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    } else {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('users')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  });
}

exports.editArticle = function(data) {
  articleExists(data.url_slug, function(exists) {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('articles')
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    } else {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('articles')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  });
}

exports.editFile = function(data) {
  fileExists(data.url_slug, function(exists) {
    if (exists) {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('files')
          .where({url_slug: data.url_slug})
          .update(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    } else {
      // Using trx as a transaction object:
      knex.transaction(function(trx) {
        knex('files')
          .insert(data)
          .transacting(trx)
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  });
}
