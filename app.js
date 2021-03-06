// app.js
const express = require('express');

const app = express();
const path = require('path');

// socket.io has to use the http server
const server = require('http').Server(app);

const io = require('socket.io')(server);
//We'll store our online users here
let onlineUsers = {};
io.on("connection", (socket) => {
  // Make sure to send the users to our chat file
  require('./sockets/chat.js')(io, socket, onlineUsers);
})

// express view engine for pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// establish public folder
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
});
