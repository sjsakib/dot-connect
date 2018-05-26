const { dbHost } = require('./config');
const mongoose = require('mongoose');
const { Game, User } = require('./models');

mongoose.connect(dbHost);

const getPublicGames = () => {
    return new Promise(resolve => {
        Game.find(
            { public: true },
            '-_id gameId players size status',
            (err, games) => {
                if (err) throw err;
                resolve(games);
            }
        );
    });
};

const updateUser = params => {
    User.update(
        { id: params.id },
        { name: params.name },
        { upsert: true, setDefaultsOnInsert: true }
    ).exec();
};

const getUserName = userId => {
    return new Promise(resolve => {
        User.findOne({ id: userId }, 'name', (err, user) => {
            resolve(user.name);
        });
    });
};

const getGameList = userId => {
    return new Promise(resolve => {
        Game.find(
            {
                $or: [{ 'users.x': userId }, { 'users.o': userId }]
            },
            'gameId players size status',
            (err, games) => {
                if (err) throw err;
                resolve(
                    games.map(game => ({
                        gameId: game.gameId,
                        name: game.players.x + ' vs ' + game.players.o,
                        size: game.size.r + 'x' + game.size.c,
                        status: game.status
                    }))
                );
            }
        );
    });
};

const getTopChart = users => {
    let query;
    if (users) query = { id: { $in: users } };
    else query = {};
    return new Promise(resolve => {
        User.find(
            query,
            '-_id id name points',
            { sort: { points: -1 } },
            (err, users) => {
                resolve(users);
            }
        );
    });
};

const createGame = data => {
    const game = new Game(data);
    return new Promise(resolve => {
        game.save(() => resolve());
    });
};

const getGameById = id => {
    return new Promise(resolve => {
        Game.findOne({ gameId: id }, '-_id', (err, game) => {
            if (err) throw err;
            if (game) resolve(game.toObject());
            else resolve(null);
        });
    });
};

const updateGameById = (id, data) => {
    return new Promise(resolve => {
        Game.findOneAndUpdate({ gameId: id }, data, () => {
            resolve();
            if (data.status && data.status === 'finished')
                updatePoints(data.gameId);
        });
    });
};

const updatePoints = gameId => {
    Game.findOne({ gameId }, (err, game) => {
        if (!game || game.pointsCounted) return;

        const points = game.score.x - game.score.o;

        let toUpdate;
        if (points > 0) {
            toUpdate = game.users.x;
        } else {
            toUpdate = game.users.o;
        }

        User.update(
            { id: toUpdate },
            { $inc: { points: Math.abs(points) } }
        ).exec();

        Game.update({ gameId }, { pointsCounted: false }).exec();
    });
};

module.exports = {
    getGameById,
    getPublicGames,
    createGame,
    updateGameById,
    getGameList,
    updateUser,
    getUserName,
    getTopChart
};