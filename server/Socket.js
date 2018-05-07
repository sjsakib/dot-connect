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
            leaveAllOtherRooms(socket);

            const newGame = Storage.createGame(data.gameId, data);

            //CLIENT is going to join the new ROOM
            socket.join(newGame.gameId);

            if (newGame.public) {
                //Update all the connected users, except CLIENT, with this new game link
                socket.broadcast.emit(
                    'UPDATE_GAME_LIST',
                    Storage.getPublicGames()
                );
            }

            //Notify the CLIENT about the Game creation and CONNECTED Status
            socket.emit('CONNECTED');

            socket.on('disconnect', () => {
                if (data.status === 'waiting_for_opponent') {
                    Storage.deleteGame(newGame.gameId);
                    io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());
                }

                //Notify the Room that the CLIENT is disconnected
                socket.broadcast.to(newGame.gameId).emit('PEER_DISCONNECTED');
            });
        });

        socket.on('JOIN_GAME', gameId => {
            io
                .of('/')
                .in(gameId)
                .clients((error, inRoom) => {
                    if (error) throw error;
                    if (inRoom.length === 1) {
                        // leave all previous games
                        leaveAllOtherRooms(socket);

                        socket.join(gameId);

                        Storage.toggleGameVisibility(gameId);

                        //Update everyone about the new PublicGames List
                        io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());

                        socket.broadcast.to(gameId).emit('SYNC', {
                            ...Storage.getGameById(gameId),
                            ...{ status: 'started' }
                        });

                        socket.broadcast.to(gameId).emit('PEER_CONNECTED');
                        socket.emit('PEER_CONNECTED');

                        socket.on('disconnect', () => {
                            socket.broadcast
                                .to(gameId)
                                .emit('PEER_DISCONNECTED');
                        });
                    }
                });
        });

        socket.on('REQUEST_GAME_INFO', gameId => {
            const game = Storage.getGameById(gameId);
            if (!game) return;
            socket.emit('SYNC', {
                ...game,
                ...{
                    status: 'waiting_to_join',
                    isX: !game.isX
                }
            });
        });

        socket.on('SYNC', data => {
            Storage.updateGameById(data.gameId, data);
            socket.broadcast.to(data.gameId).emit('SYNC', data);
        });

        socket.on('REJOIN', data => {
            socket.join(data.gameId);
            socket.broadcast.to(data.gameId).emit('SYNC', data);
            socket.broadcast.to(data.gameId).emit('PEER_CONNECTED');
        });
    });

    const leaveAllOtherRooms = socket => {
        Object.keys(socket.rooms).forEach(room => {
            socket.leave(room);
        });
    };
};
