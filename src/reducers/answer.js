import nodeClicked from './nodeClicked';

const answer = state => {
	let finalState = {...state};

	state = {...state, ...{ isX: false }};

	let points = -1e5;
	let step = state.step;
	let newState;
	let newPoints;

	// Now iterate through the grid try every move
	for (let i = 0; i < state.size.r; i++) {
		for (let j = 0; j < state.size.c; j++) {
			if (i !== state.size.r - 1) {
				newState = nodeClicked(nodeClicked(state, {r: i, c: j}), {r: i+1, c: j});
				newPoints = checkPoints({...newState, ...{isX: true}});
				if (newPoints > points && newState.step > step) {
					finalState = newState;
					points = newPoints;
				} else if ( newPoints === points && Math.random() > .95 && newState.step > step) {
					finalState = newState;
					points = newPoints;
				}
			}

			if ( j !== state.size.c - 1 ) {
				newState = nodeClicked(nodeClicked(state, {r: i, c: j}), {r: i, c: j+1});
				newPoints = checkPoints({...newState, ...{isX: true}});
				if (newPoints > points && newState.step > step) {
					finalState = newState;
					points = newPoints;
				} else if ( newPoints === points && Math.random() > .95 && newState.step > step) {
					finalState = newState;
					points = newPoints;
				}
			}
		}
	}
	finalState.isX = true;
	return finalState;
}

const checkPoints = state => {
	let points = state.score.o - state.score.x;
	let step = state.step;
	let newState;
	let newPoints;

	// Now iterate through the grid try every move
	// find and return the worst case
	for (let i = 0; i < state.size.r; i++) {
		for (let j = 0; j < state.size.c; j++) {
			newState = nodeClicked(nodeClicked(state, {r: i, c: j}), {r: i+1, c: j});
			newPoints = newState.score.o - newState.score.x;
			if (newPoints < points && newState.step > step) {
				points = newPoints;
			}

			newState = nodeClicked(nodeClicked(state, {r: i, c: j}), {r: i, c: j+1});
			newPoints = newState.score.o - newState.score.x;
			if (newPoints < points && newState.step > step) {
				points = newPoints;
			}
		}
	}
	return points;
}

export default answer;