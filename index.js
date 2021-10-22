const http = require('http');

let ipAddressReqs = new Map();

const parseIp = (req) => req.headers['x-forwarded-for'].split(',').shift()
  || req.socket.remoteAddress;

const requestHandled = (ipAddress) => {
  const newIpAddressReqs = new Map([...ipAddressReqs]);
  if (newIpAddressReqs.has(ipAddress)) {
    let accIpAddressReqs = newIpAddressReqs.get(ipAddress);
    accIpAddressReqs += 1;
    newIpAddressReqs.set(ipAddress, accIpAddressReqs);
  } else {
    newIpAddressReqs.set(ipAddress, 1);
  }
  return newIpAddressReqs;
};

const requestListener = function (req, res) {
  res.writeHead(200);
  ipAddressReqs = new Map([...requestHandled(parseIp(req))]);
  console.log(ipAddressReqs.size)

  res.end('Finally done')
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);