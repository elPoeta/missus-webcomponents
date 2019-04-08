const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./startUp/serveFiles')(app);

require('./SocketManager/socketManager')(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));