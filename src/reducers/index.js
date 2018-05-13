import nodeClicked from './nodeClicked';
import resetGame from './resetGame';

const initialState = {
	gameStatus: 'Game not started',
	status: 'not_started',	
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'NODE_CLICKED':
			const step = state.step;
			state = { ...state, ...nodeClicked(state, action.node) };
			if (step !== state.step) action.after(state);
			return state;
		case 'RESET_GAME':
			return {
				...state,
				...resetGame(action.size, action.players, action.xIsNext)
			};
		case 'UPDATE_STATE':
			return { ...state, ...action.data };
		case 'UPDATE_GAME_LIST':
			return {
				...state,
				...{
					availableGames: action.data
				}
			};
		case 'UPDATE_USER':
			return {
				...state,
				...{
					user: action.data
				}
			}
		default:
			return state;
	}
}
