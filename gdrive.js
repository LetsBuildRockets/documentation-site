const google = require('googleapis')
const key = require('./gdrive_secret.json') // this is found here https://console.cloud.google.com/iam-admin/serviceaccounts?folder=&organizationId=&project=lets-build-rockets
const drive = google.drive('v2')
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
)

exports.getFolders = (folderID, callback) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }

    drive.files.list({
      auth: jwtClient,
      maxResults: 99999,
      q: '\'' + folderID + '\' in parents and mimeType = \'application/vnd.google-apps.folder\'',
      orderBy: 'title',
      fields: 'items(id,title)'
    }, (err, resp) => {
      if (err != null) {
        console.log('Error:', err)
      }
      // TODO: Make it retry if there's an error.
      callback(resp)
    })
  })
}

exports.getFiles = (folderID, callback) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }

    drive.files.list({
      auth: jwtClient,
      maxResults: 99999,
      q: '\'' + folderID + '\' in parents and mimeType != \'application/vnd.google-apps.folder\'',
      orderBy: 'title',
      fields: 'items(id,parents/id,title,description,fullFileExtension,createdDate,modifiedDate,mimeType)'
    }, (err, resp) => {
      if (err != null) {
        console.log('Error:', err)
      }
      // TODO: Make it retry if there's an error.
      callback(resp)
    })
  })
}

exports.getFile = (fileID, callback) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }

    drive.files.get({
      auth: jwtClient,
      fileId: fileID
    }, (err, resp) => {
      if (err != null) {
        console.log('Error:', err)
      }
      callback(resp)
    })
  })
}

exports.setFileTitle = (fileID, newTitle) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }

    drive.files.patch({
      auth: jwtClient,
      fileId: fileID,
      setModifiedDate: true,
      resource: { title: newTitle }
    }, (err, resp) => {
      if (err != null) {
        console.log('Error:', err)
      }
      console.log(resp)
    })
  })
}

exports.setFileDescription = (fileID, newDescription) => {
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
      return
    }

    drive.files.patch({
      auth: jwtClient,
      fileId: fileID,
      setModifiedDate: true,
      resource: { description: newDescription }
    }, (err, resp) => {
      if (err != null) {
        console.log('Error:', err)
      }
      console.log(resp)
    })
  })
}
