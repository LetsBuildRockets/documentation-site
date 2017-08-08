const gdrive = require('./gdrive.js');
const db = require('./database');
const async = require('async');

const rootFolder = '0B_RM9WoF1XjFMjcwTFhYSHp4c28';

var folders = {};

var folderQ = async.queue(function(folderID, folderCallback) {
  gdrive.getFolders(folderID, folderCallback);
}, 1);
folderQ.drain = function() {
  console.log('The folders are done!');
  syncFiles();
}

var fileQ = async.queue(function(folderID, fileCallback) {
  gdrive.getFiles(folderID, fileCallback);
}, 1);
fileQ.drain = function() {
  console.log('The files are done!');
}

exports.update = function() {
  folders[rootFolder] = [];
  gdrive.getFolders(rootFolder, function(folderResponse){
    iterate(folderResponse, [], '');
  });
}

function iterate(folderResponse, folderList, folderID) {
  if (folderID != "") {
    folders[folderID] = folderList;
    console.log(folderID + ': ' + folderList);
  }
  if (folderResponse != null) {
    folderResponse.items.forEach(function(folder) {
      folderQ.push(folder.id, function(newData) {
        var newFolderList = folderList.slice();
        newFolderList.push(folder.title);
        iterate(newData, newFolderList, folder.id);
      });
    });
  }
}

function syncFiles() {
  for (var key in folders) {
    fileQ.push(key, addFiles);
  }
}

function addFiles(fileResponse) {
  if (fileResponse != null) {
    fileResponse.items.forEach(function(file) {
      var parent_titles = [];
      file.parents.forEach(function(parent) {
        folders[parent.id].forEach(function(parentID) {
          parent_titles.push(parentID);
        });
      });

      var modified = (new Date(Date.parse(file.modifiedDate))).toISOString();
      var created = (new Date(Date.parse(file.createdDate))).toISOString();
      //var modified = Date.format(file.modifiedDate); // Not how it would actually be done
      db.editFile({name: file.title, description: file.description, date_modified: modified, date_created: created, url_slug: file.id, mimetype: file.mimeType, extension: file.fullFileExtension, parent_titles: JSON.stringify(parent_titles)});
    });
  }
}
