const gdrive = require('./gdrive.js');
const async = require('async');

var folders = {};

var q = async.queue(function(data, callback) {
  gdrive.getFolders(data, callback);
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

function iterate(data, titleList, folderID) {
  if (folderID != "") {
    folders[folderID] = titleList;
    console.log(folderID + ': ' + titleList);
  }
  if (data != null) {
    data.items.forEach(function(folder) {
      q.push(folder.id, function(newData) {
        var newTitleList = titleList.slice();
        newTitleList.push(folder.title);
        iterate(newData, newTitleList, folder.id);
      });
    });
  }
}
