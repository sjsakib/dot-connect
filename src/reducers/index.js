import nodeClicked from './nodeClicked';
import resetGame from './resetGame';

const initialState = {
  gameStatus: 'Game not started',
};


export default function(state = initialState, action) {
  switch (action.type) {
    case 'NODE_CLICKED':
      return {...state, ...nodeClicked(state, action.node)};
    case 'RESET_GAME':
      return {...state, ...resetGame(action.size, action.players, action.xIsNext)};
    default:
      return state;
  }
}