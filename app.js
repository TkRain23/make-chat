// app.js

const express = require('express');
const app = express();
const path = require('path');

// socket.io has to use the http server
const server = require('http').Server(app);

// express view engine for pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})
