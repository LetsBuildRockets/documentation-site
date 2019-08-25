const https = require('https')

const options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: '/drive/v2/files/0BwFaRrEmPx2yNk9QdFFCZ0hCbzQ?key=KEYGOESHERE',
  method: 'GET'
}

const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode)
  console.log('headers:', res.headers)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (e) => {
  console.error(e)
})
req.end()
