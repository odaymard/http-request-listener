http = require('http');
const server = http.createServer((req, res) => {
  let body = '';
  const { method, url, headers } = req;
  console.log(method, url, headers);
  if (method == 'GET' || method == 'HEAD') {
    res.setHeader('Content-Type', 'text/html');
    res.statusCoode = 200;
    if (method == 'GET') {
      res.write('<!doctype html>\r\n' +
        '<html>\r\n' +
        '<title>Hello World!</title>\r\n' +
        '<h1>Hello World!\r\n' +
        '</html>');
      res.end();
    }
  } else if (method == 'POST') {
    req.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body += chunk;
    }).on('end', () => {
      console.log('body is : ' + body);
      res.on('error', (err) => {
        console.error(err);
      })
      res.statusCode = 302;
      res.setHeader('location', '/');
      res.end();
    })
  } else {
    res.statusCode = 403;
    res.end();
  }

}).listen(8080);
