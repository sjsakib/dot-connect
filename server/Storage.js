module.exports.games = {};
module.exports.getPublicGames = () => {
  let publicGames = {};

  for (gameId in this.games) {
    if (this.games[gameId].public) {
      publicGames[gameId] = {
        gameId: gameId,
        players: this.games[gameId].players,
        size: this.games[gameId].size,
      };
    }
  }
  return publicGames;
}
