const http = require('http');

const { PORT } = process.env;

const requestListener = async (req, res) => {
    res.writeHead(200);
    res.end(`Hello from ${req.client.remoteAddress}:${req.client.remotePort}\n`
    + `to ${req.client.localAddress}:${req.client.localPort}`);
}

const server = http.createServer(requestListener);
server.listen(PORT);