const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(8080);

const games = {};

app.get('/', function (req, res) {
  res.json(games);
});

io.on('connection', function(socket){

  let publicGames = {};
  for (gameId in games) {
    if (games[gameId].public) {
      publicGames[gameId] = {
        gameId: gameId,
        players: games[gameId].players,
        size: games[gameId].size,
      };
    }
  }
  socket.emit('UPDATE_GAME_LIST', publicGames);

  socket.on('NEW_GAME', function(data) {
    // leave all previous rooms
    const rooms = Object.keys(socket.rooms);
    rooms.forEach(function(room){
      socket.leave(room);
    });

    games[data.gameId] = data;
    socket.join(data.gameId);

    if (data.public) {
      socket.broadcast.emit('UPDATE_GAME_LIST', {
        [data.gameId]: {
          players: data.players,
          size: data.size,
        }
      });
    }

    socket.emit('CONNECTED');

    socket.on('disconnect', function(){
      if(data.status === 'waiting_for_opponent') {
        data.public = false;
        io.emit('UPDATE_GAME_LIST', {
          [data.gameId]: undefined,
        });
      }
      socket.broadcast.to(data.gameId).emit('PEER_DISCONNECTED');
    });
  });

  socket.on('JOIN_GAME', function(gameId){
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
        games[gameId].public = false;
        io.emit('UPDATE_GAME_LIST', {
          [games[gameId]]: undefined,
        });

        socket.broadcast.to(gameId).emit('SYNC', {
          ...games[gameId],
          ...{ status: 'started' }
        });

        socket.broadcast.to(gameId).emit('PEER_CONNECTED');
        socket.emit('PEER_CONNECTED');

        socket.on('disconnect', function(){
          socket.broadcast.to(gameId).emit('PEER_DISCONNECTED');
        });
      }
    });
  });

  socket.on('REQUEST_GAME_INFO', function(gameId){
    if(!games[gameId]) return;
    socket.emit('SYNC', {
      ...games[gameId],
      ...{
        status: 'waiting_to_join',
        isX: !games[gameId].isX,
      }
    });
  });

  socket.on('SYNC', function(data){
    games[data.gameId] = data;
    socket.broadcast.to(data.gameId).emit('SYNC', data);
  });

  socket.on('REJOIN', function(data){
    socket.join(data.gameId);
    socket.broadcast.to(data.gameId).emit('SYNC', data);
    socket.broadcast.to(data.gameId).emit('PEER_CONNECTED');
  });

});
