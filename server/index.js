const app = require('express')();
const server = require('http').Server(app);
const Socket = require('./Socket')(server);
const Storage = require('./Storage');

server.listen(8080);

app.get('/', function(req, res) {
    res.json(Storage.getAllGames());
});
