//This module will be converted to a Database Wrapper later

const games = [];

const getPublicGames = () => {
    return games.filter(game => game.public).map(game => ({
        gameId: game.gameId,
        players: game.players,
        size: game.size
    }));
};

const createGame = (id, data) => {
    games.push(data);

    return data;
};

const getGameById = id => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].gameId == id) return games[i];
    }

    return null;
};

const deleteGame = id => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].gameId === id) {
            games.splice(i, 1);
            break;
        }
    }
};

const getAllGames = () => games;

const toggleGameVisibility = id => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].gameId === id) {
            games[i].public = false;
            break;
        }
    }
};

const updateGameById = (id, data) => {
    for (let i = 0; i < games.length; i++) {
        if (games[i].gameId == id) {
            games[i] = data;
            return games[i];
        }
    }
};

module.exports = {
    getAllGames,
    getGameById,
    getPublicGames,
    createGame,
    deleteGame,
    toggleGameVisibility,
    updateGameById
};
