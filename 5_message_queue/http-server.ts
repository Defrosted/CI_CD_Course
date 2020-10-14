import * as http from 'http';
import * as fs from 'fs';
import { settings } from './util';

const { PORT } = process.env;
const { messagesFilePath } = settings;

const requestListener = (req, res): void => {
    console.log("Received HTTP request");
    try {
        const messages = fs.readFileSync(messagesFilePath);
        res.writeHead(200);
        res.end(messages);
    } catch (error) {
        res.writeHead(500);
        res.end("Request failed: ", error);
    }
};

const server = http.createServer(requestListener);
server.listen(PORT);

console.log(`Server listening on port ${PORT}`);