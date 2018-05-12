import nodeClicked from './nodeClicked';
import resetGame from './resetGame';
import connection_changed from './connection_changed';

const initialState = {
	gameStatus: 'Game not started'
};

export default function(state = initialState, action) {
	switch (action.type) {
		case 'NODE_CLICKED':
			state = { ...state, ...nodeClicked(state, action.node) };
			action.after(state);
			return state;
		case 'RESET_GAME':
			return {
				...state,
				...resetGame(action.size, action.players, action.xIsNext)
			};
		case 'UPDATE_STATE':
			return { ...state, ...action.data };
		case 'CONNECTION_CHANGED':
			return { ...state, ...connection_changed(state, action) };
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
