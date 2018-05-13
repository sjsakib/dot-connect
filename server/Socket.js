module.exports = server => {
    const io = require('socket.io')(server);
    const Storage = require('./Storage');

    const getGames = () => Storage.getAllGames();

    // A new User (CLIENT) is Connected
    io.on('connection', socket => {
        //At the beginning of a connection update the CLIENT with the Public Game List
        socket.emit('UPDATE_GAME_LIST', Storage.getPublicGames());

        //When the CLIENT wants to start a new Game
        socket.on('NEW_GAME', data => {
            // leaveAllOtherRooms(socket);

            const newGame = Storage.createGame(data.gameId, data);

            // CLIENT is going to join the new ROOM
            // socket.join(newGame.gameId);

            if (newGame.public) {
                //Update all the connected users, except CLIENT, with this new game link
                socket.broadcast.emit(
                    'UPDATE_GAME_LIST',
                    Storage.getPublicGames()
                );
            }

            socket.on('disconnect', () => {
                const game = Storage.getGameById(data.gameId);
                if (!game) return;
                if (game.status === 'waiting_for_opponent') {
                    Storage.deleteGame(newGame.gameId);
                    io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());
                }
            });
        });

        socket.on('JOIN_GAME', data => {
            // leave all previous games
            leaveAllOtherRooms(socket);

            socket.join(data.gameId);
            console.log(data.userId + ' joined... ' + data.gameId)

            const game = Storage.getGameById(data.gameId);
            if ( !game ) return;
            if ( game.status === 'waiting_for_opponent' && game.users.x != data.userId) {
                Storage.toggleGameVisibility(data.gameId);

                //Update everyone about the new PublicGames List
                io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());

                game.status = 'started';
                game.users.o = data.userId;
            }

            const isX = game.users.x === data.userId;
            const isO = game.users.o === data.userId;

            if ( isX ) {
                game.connected.x = true;
            } else if ( isO ) {
                game.connected.o = true;
            }
            Storage.updateGameById(data.gameId, game);

            socket.to(game.gameId).emit('SYNC', {
                status: game.status,
                users: game.users,
                connected: game.connected,
            });

            socket.on('disconnect', () => {
                const game = Storage.getGameById(data.gameId);
                if (!game) return;
                if ( isX ) {
                    game.connected.x = false;
                } else if ( isO ) {
                    game.connected.o = false;
                }
                Storage.updateGameById(data.gameId, game);
                socket.broadcast.to(data.gameId).emit('SYNC', game);
            });
        });

        socket.on('REQUEST_GAME_INFO', data => {
            const game = Storage.getGameById(data.gameId);
            if (!game) {
                socket.emit('SYNC', {
                    status: 'not_found',
                });
                return;
            }
            socket.emit('SYNC', {
                ...game,
                ...{
                    isX: game.users.x === data.userId,
                }
            });
        });

        socket.on('SYNC', data => {
            Storage.updateGameById(data.gameId, data);
            socket.broadcast.to(data.gameId).emit('SYNC', data);
        });

        socket.on('REJOIN', data => {
            socket.join(data.gameId);
            const game = Storage.getGameById(data.gameId);
            if ( !game ) return;
            const isX = game.users.x === data.userId;
            const isO = game.users.o === data.userId;
            if ( isX ) {
                game.connected.x = true;
            } else if ( isO ) {
                game.connected.o = true;
            }
            Storate.updateGameById(data.gameId, game);

            socket.emit('SYNC', game);
        });
    });

    const leaveAllOtherRooms = socket => {
        Object.keys(socket.rooms).forEach(room => {
            socket.leave(room);
        });
    };
};
