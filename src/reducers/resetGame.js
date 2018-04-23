function resetGame(size, players, random) {
  const xIsNext = (random ? Math.random() > 0.5 : true);
  return {
    size: size,
    lastClicked: null,
    xIsNext: xIsNext,
    score: {
      x: 0,
      o: 0,
    },
    players: {
      x: players.x,
      o: players.o,
    },
    gameStatus: `To move: ${xIsNext ? players.x : players.o}`,
    gridNodes: Array(size.r)
      .fill()
      .map(() =>
        Array(size.c)
        .fill()
        .map(() => ({
          right: false,
          down: false,
          owner: null
        }))
      )
  };
}

export default resetGame;
