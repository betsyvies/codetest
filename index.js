const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  console.log('Hola Mundo')

  res.end('Finally done')
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);