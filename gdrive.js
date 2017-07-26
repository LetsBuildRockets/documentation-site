const https = require('https');
const gdriveAuthKey = fs.readFileSync('./gdrive.secret', 'utf8').trim();


exports.getFile = function(fid, callback) {
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: '/drive/v2/files/' + fid + '?key=' + gdriveAuthKey,
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    var jsonifiedData = "";

    res.on('data', (d) => {
      jsonifiedData += d.toString('utf8');
    });

    res.on('end', () => {
      callback(JSON.parse(jsonifiedData));
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

exports.setFile = function(fid, title, description) {
  const options = {
    hostname: 'www.googleapis.com',
    port: 443,
    path: '/drive/v2/files/' + fid + '?key=' + gdriveAuthKey,
    method: 'PATCH',
  };

  const req = https.request(options, (res) => {

    res.on('data', callback);
  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}
