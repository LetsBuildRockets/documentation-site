const google = require('googleapis');
const key = require('./gdrive_secret.json');
const drive = google.drive('v2');
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly'], // an array of auth scopes
  null
);

exports.getFolders = function(folderID, callback) {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    drive.files.list({
      auth: jwtClient,
      maxResults: 99999,
      q: '\'' + folderID + '\' in parents and mimeType = \'application/vnd.google-apps.folder\'',
      orderBy: 'title',
      fields: 'items(id,title)'
    }, function (err, resp) {
      //TODO: Make it retry if there's an error.
      callback(resp);
    });
  });
}

exports.getFiles = function(folderID, callback) {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    drive.files.list({
      auth: jwtClient,
      maxResults: 99999,
      q: '\'' + folderID + '\' in parents and mimeType != \'application/vnd.google-apps.folder\'',
      orderBy: 'title',
      fields: 'items(id,parents/id,title,description,fullFileExtension,createdDate,modifiedDate,mimeType)'
    }, function (err, resp) {
      //TODO: Make it retry if there's an error.
      callback(resp);
    });
  });
}

exports.getFile = function(fileID, callback) {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    drive.files.get({
      auth: jwtClient,
      fileId: fileID
    }, function (err, resp) {
      callback(resp);
    });
  });
}

exports.setFileTitle = function(fileID, newTitle) {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    drive.files.patch({
      auth: jwtClient,
      fileId: fileID,
      setModifiedDate: true,
      resource: {title: newTitle}
    }, function (err, resp) {
      console.log("Error:", err);
      console.log(resp);
    });
  });
}

exports.setFileDescription = function(fileID, newDescription) {
  jwtClient.authorize(function (err, tokens) {
    if (err) {
      console.log(err);
      return;
    }

    drive.files.patch({
      auth: jwtClient,
      fileId: fileID,
      setModifiedDate: true,
      resource: {description: newDescription}
    }, function (err, resp) {
      console.log("Error:", err);
      console.log(resp);
    });
  });
}
