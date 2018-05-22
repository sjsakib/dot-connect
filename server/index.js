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

app.post('/update-user/:id/:name', function(req, res) {
	Storage.updateUser(req.params);
	res.sendStatus(200);
});

app.get('/game-list/:userId', function(req, res) {
	Storage.getGameList(req.params.userId).then(allGames => {
		const current = allGames
			.filter(game => game.status !== 'finished')
			.map(game => ({
				gameId: game.gameId,
				name: game.name,
				size: game.size
			}));
		const finished = allGames
			.filter(game => game.status === 'finished')
			.map(game => ({
				gameId: game.gameId,
				name: game.name,
				size: game.size
			}));
		Storage.getUserName(req.params.userId).then(name => {
			res.json({
				name,
				current,
				finished
			});
		});
	});
});