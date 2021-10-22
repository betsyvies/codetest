const http = require('http');

let ipAddressReqs = new Map();
let ipAddressReqsTop100 = new Map();

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
  return top100(ipAddress, newIpAddressReqs.get(ipAddress));
};

const top100 = (ipAddress, accIpAddress) => {
  const newIpAddressReqsTop100 = new Map([...ipAddressReqsTop100]);
  if (newIpAddressReqsTop100.size <= 100) {
    newIpAddressReqsTop100.set(ipAddress, accIpAddress)
    return newIpAddressReqsTop100;
  }
  if (newIpAddressReqsTop100.has(ipAddress)) {
    newIpAddressReqsTop100.set(ipAddress, accIpAddress)
    return newIpAddressReqsTop100;
  }
  newIpAddressReqsTop100.forEach((value, key) => {
    if (accIpAddress > value) {
      newIpAddressReqsTop100.delete(key);
      newIpAddressReqsTop100.set(ipAddress, accIpAddress);
    }
  })
  return new Map([...Array.from(newIpAddressReqsTop100).sort(([, a], [, b]) => b - a)])
};

const requestListener = function (req, res) {
  res.writeHead(200);
  ipAddressReqsTop100 = new Map([...requestHandled(parseIp(req))]);
  console.log(ipAddressReqsTop100.size)

  res.end('Finally done')
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);