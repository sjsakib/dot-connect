import nodeClicked from './nodeClicked';
import resetGame from './resetGame';
import answer from './answer';

const initialState = {
	gameStatus: 'Game not started',
	status: 'not_started'
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'NODE_CLICKED':
			let step = state.step;
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
			};
		case 'ANSWER':
			step = state.step;
			state = answer(state);
			if (step !== state.step) action.after(state);
			return state;
		case 'DISCONNECTED':
			return {
				...state,
				...{ connected: { x: false, o: false } }
			};
		default:
			return state;
	}
}