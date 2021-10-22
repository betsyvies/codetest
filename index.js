const http = require('http');

const parseIp = (req) =>
  req.headers['x-forwarded-for'].split(',').shift()
  || req.socket.remoteAddress

const requestListener = function (req, res) {
  res.writeHead(200);
  console.log('Hola Mundo')

  res.end(parseIp(req))
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);