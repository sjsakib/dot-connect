const mongoose = require('mongoose');
const { Game, User } = require('./models');

mongoose.connect('mongodb://dot-connect:D0t-conn3ct@ds227740.mlab.com:27740/dot-connect');

const getPublicGames = () => {
    return new Promise(resolve => {
        Game.find({public: true}, '-_id gameId players size status', (err, games) => {
            if (err) throw err;
            resolve(games);
        })
    })
};

const getGameList = userId => {
    return new Promise(resolve => {
        Game.find({
            $or: [ { 'users.x': userId }, { 'users.o': userId } ],
        },
        'gameId players size status',
        (err, games) => {
            if (err) throw err;
            resolve(games.map(game => ({
                gameId: game.gameId,
                name: game.players.x + ' vs ' + game.players.o,
                size: game.size.r + 'x' + game.size.c,
                status: game.status,
            })))
        })
    })
}

const createGame = data => {
    const game = new Game(data);
    return new Promise(resolve => {
        game.save(() => resolve())
    });
};

const getGameById = id => {
    return new Promise(resolve => {
        Game.findOne({gameId: id}, '-_id', (err, game) => {
            if ( err ) throw err;
            if (game) resolve(game.toObject());
            else resolve(null);
        });
    });
};

const updateGameById = (id, data) => {
    return new Promise(resolve => {
        Game.findOneAndUpdate({gameId: id}, data, () => resolve());
    });
};

module.exports = {
    getGameById,
    getPublicGames,
    createGame,
    updateGameById,
    getGameList,
};
