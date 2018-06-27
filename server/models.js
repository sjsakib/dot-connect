const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	id: { unique: true, type: String },
	name: String,
	points: { type: Number, default: 0, index: true }
});

const GameSchema = mongoose.Schema({
	gameId: { type: String, unique: true },
	size: { r: Number, c: Number },
	step: Number,
	xIsNext: Boolean,
	score: { x: Number, o: Number },
	players: { x: String, o: String },
	users: { x: String, o: String },
	connected: { x: Boolean, o: Boolean },
	gameStatus: String,
	status: String,
	gridNodes: [
		[
			{
				_id: false,
				right: Boolean,
				down: Boolean,
				owner: String
			}
		]
	],
	public: Boolean,
	offline: {type: Boolean, default: false},
	pointsCounted: Boolean,
});

const User = mongoose.model('User', UserSchema);

const Game = mongoose.model('Game', GameSchema);

module.exports = {
	User,
	Game
};