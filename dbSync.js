const gdrive = require('./gdrive.js');
const async = require('async');

var folders = {};

var q = async.queue(function(folderID, folderCallback, fileCallback) {
  gdrive.getFolders(folderID, folderCallback);
  gdrive.getFiles(folderID, fileCallback);
}, 1);
q.drain = function() {
  console.log('That\'s all folks!')
  console.log(folders); //We would then run a function that hasn't been written yet.
}

exports.makeTree = function() {
  gdrive.getFolders('0B_RM9WoF1XjFMjcwTFhYSHp4c28', function(data){
    iterate(data, [], '');
  });
}

function iterate(data, folderList, folderID) {
  if (folderID != "") {
    folders[folderID] = folderList;
    console.log(folderID + ': ' + folderList);
  }
  if (data != null) {
    data.items.forEach(function(folder) {
      q.push(folder.id, function(newData) {
        var newFolderList = folderList.slice();
        newFolderList.push(folder.title);
        iterate(newData, newFolderList, folder.id);
      }, addFiles(fileData));
    });
  }
}

function addFiles(data) {
  data.items.forEach(function(file) {
    // Put code for interfacing with database here.
  })
}
