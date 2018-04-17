import nodeClicked from './nodeClicked';
import resetGame from './resetGame';

const size = {
  r: 7,
  c: 5,
};

const initialState = {
  size: size,
  lastClicked: null,
  xIsNext: true, // Let's call the first player X
  score: {
    x: 0,
    o: 0,
  },
  players: {
    x: 'X',
    o: 'O',
  },
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


export default function(state = initialState, action) {
  switch (action.type) {
    case 'NODE_CLICKED':
      return {...state, ...nodeClicked(state, action.node)};
    case 'RESET_GAME':
      return {...state, ...resetGame(initialState, action.size, action.players)};
    default:
      return state;
  }
}