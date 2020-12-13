require('dotenv').config()
const http = require('http');
const { requestHandler } = require('./routes');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(requestHandler);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
