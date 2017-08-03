const gdrive = require('./gdrive.js');
const db = require('./database');
const async = require('async');

var folders = {};

var driveQ = async.queue(function(folderID, folderCallback, fileCallback) {
  gdrive.getFolders(folderID, folderCallback);
  gdrive.getFiles(folderID, fileCallback);
}, 1);
driveQ.drain = function() {
  console.log('That\'s all folks!')
  console.log(folders);
}

var dbQ = async.queue(function(fileStuff) {
  db.editFile(fileStuff);
}, 1);
dbQ.drain = function() {
  console.log('That\'s all folks!')
}

exports.makeTree = function() {
  gdrive.getFolders('0B_RM9WoF1XjFMjcwTFhYSHp4c28', function(folderResponse){
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
      driveQ.push(folder.id, function(newData) {
        var newFolderList = folderList.slice();
        newFolderList.push(folder.title);
        iterate(newData, newFolderList, folder.id);
      }, addFiles(fileResponse));
    });
  }
}

function addFiles(fileResponse) {
  if (fileResponse != null) {
    fileResponse.items.forEach(function(file) {
      //var modified = Date.format(file.modifiedDate); // Not how it would actually be done
      //var parents = folders.id; // Will the folders tree be done with everything above the file we get to?
      dbQ.push({name: file.title, description: file.description, date_modified: modified, date_created: created, tags: parents, url_slug: file.id, mimetype: file.mimeType, extension: file.fullFileExtension})
    });
  }
}
