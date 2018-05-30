const app = require('express')();
const server = require('http').Server(app);
const Socket = require('./Socket')(server);
const Storage = require('./Storage');
const { siteUrl } = require('./config');

server.listen(8080);

app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', siteUrl);

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/', function(req, res) {
	res.json({ message: 'server running...' });
});

app.post('/update-user/:id/:name/:oldId', function(req, res) {
	Storage.updateUser(req.params);
	res.sendStatus(200);
});

app.get('/topchart', function(req, res) {
	let friends;
	if (req.query.friends) friends = req.query.friends.split(',');
	else friends = null;
	Storage.getTopChart(friends).then(users => {
		res.json(users);
	});
});

app.get('/active-games', function(req, res) {
	Storage.getActiveGames(10).then(games => {
		res.json(games);
	});
});

app.get('/game-list/:userId', function(req, res) {
	Storage.getGameList(req.params.userId, false, 10).then(current => {
		Storage.getGameList(req.params.userId, true, 10).then(finished => {
			Storage.getUserName(req.params.userId).then(name => {
				res.json({
					name,
					current,
					finished
				});
			});
		});
	});
});