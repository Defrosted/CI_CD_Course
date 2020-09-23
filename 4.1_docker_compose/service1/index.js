const http = require('http');
const axios = require('axios');

const { PORT, SERVICE2_ADDRESS } = process.env;

const server = http.createServer();

server.on('request', async (req, res) => {
    const serviceResponse = await axios.get(`http://${SERVICE2_ADDRESS}`);

    res.writeHead(200);
    res.end(`Hello from ${req.client.remoteAddress}:${req.client.remotePort}\n`
        + `to ${req.client.localAddress}:${req.client.localPort}\n`
        + `${serviceResponse.data}`);
});

server.listen(PORT);