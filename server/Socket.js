module.exports = (server) => {
    const io = require('socket.io')(server);
    const Storage = require('./Storage');

    // A new User (CLIENT) is Connected
    io.on('connection', (socket) => {
    //At the beginning of a connection update the CLIENT with the Public Game List
      socket.emit('UPDATE_GAME_LIST', Storage.getPublicGames());

      //When the CLIENT wants to start a new Game
      socket.on('NEW_GAME', (data) => {
        // leave all previous rooms
        Object.keys(socket.rooms).forEach((room) => {
          socket.leave(room);
        });

        Storage.games[data.gameId] = data;

        //CLIENT is going to join the new ROOM
        socket.join(data.gameId);

        if (data.public) {
            //Update all the connected users, except CLIENT, with this new game link
          socket.broadcast.emit('UPDATE_GAME_LIST', Storage.getPublicGames());
        }

        //Notify the CLIENT about Game created and CONNECTED Status
        socket.emit('CONNECTED');

        socket.on('disconnect', () => {
          if(data.status === 'waiting_for_opponent') {
            data.public = false;
            io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());
          }

          //Notify the Room that the CLIENT is disconnected
          socket.broadcast.to(data.gameId).emit('PEER_DISCONNECTED');
        });
      });

      socket.on('JOIN_GAME', (gameId) => {
        console.log('join game', gameId);
        io.of('/').in(gameId).clients((error, inRoom) => {
          if(error) throw error;
          if(inRoom.length === 1) {
            // leave all previous games
            const rooms = Object.keys(socket.rooms);
            rooms.forEach(function(room){
              socket.leave(room);
            });

            socket.join(gameId);
            Storage.games[gameId].public = false;
            io.emit('UPDATE_GAME_LIST', Storage.getPublicGames());

            socket.broadcast.to(gameId).emit('SYNC', {
              ...Storage.games[gameId],
              ...{ status: 'started' }
            });

            socket.broadcast.to(gameId).emit('PEER_CONNECTED');
            socket.emit('PEER_CONNECTED');

            socket.on('disconnect', () => {
              socket.broadcast.to(gameId).emit('PEER_DISCONNECTED');
            });
          }
        });
      });

      socket.on('REQUEST_GAME_INFO', (gameId) => {
        if(!Storage.games[gameId]) return;
        socket.emit('SYNC', {
          ...Storage.games[gameId],
          ...{
            status: 'waiting_to_join',
            isX: !Storage.games[gameId].isX,
          }
        });
      });

      socket.on('SYNC', (data) => {
        Storage.games[data.gameId] = data;
        socket.broadcast.to(data.gameId).emit('SYNC', data);
      });

      socket.on('REJOIN', (data) => {
        socket.join(data.gameId);
        socket.broadcast.to(data.gameId).emit('SYNC', data);
        socket.broadcast.to(data.gameId).emit('PEER_CONNECTED');
      });

    });
}
