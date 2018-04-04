import React, { Component } from 'react';
import Grid from './Grid';

class Game extends React.Component {
	constructor(props) {
		super(props);
		const size = this.props.size;

		this.state = {
			lastClicked: null,
			xIsNext: true, // Let's call the first player X
			gridState: Array(size)
				.fill(null)
				.map(() =>
					Array(size)
						.fill(null)
						.map(() => ({
							right: false,
							down: false,
							owner: null
						}))
				)
		};
	}

	nodeClicked(r, c) {
		console.log(`clicked ${r}, ${c}`);
		const lastClicked = this.state.lastClicked;
		if (!lastClicked) {
			this.setState({
				lastClicked: [r, c]
			});
			return;
		}
		let gridState = this.state.gridState.slice();
		const [rr, cc] = lastClicked;
		if (Math.abs(rr - r) === 1 && cc === c) {
			r = rr < r ? rr : r;
			gridState[r][c].down = true;
			if (c !== 0) this.updateOwner(r, c - 1);
		} else if (Math.abs(cc - c) === 1 && rr === r) {
			c = cc < c ? cc : c;
			gridState[r][c].right = true;
			if (r !== 0) this.updateOwner(r - 1, c);
		} else {
			this.setState({
				lastClicked: [r, c]
			});
			return;
		}
		this.updateOwner(r, c);
		this.setState({
			gridState: gridState,
			lastClicked: null,
			xIsNext: !this.state.xIsNext
		});
	}

	updateOwner(r, c) {
		let gridState = this.state.gridState;
		let size = this.props.size;
		if (r === size - 1 || c === size - 1 || gridState[r][c].owner) {
			return;
		}
		if (
			gridState[r][c].right &&
			gridState[r][c].down &&
			gridState[r + 1][c].right &&
			gridState[r][c + 1].down
		) {
			gridState[r][c].owner = this.state.xIsNext ? 'X' : 'O';
			this.setState({
				gridState: gridState
			});
		}
	}

	render() {
		return (
			<Grid
				size={this.props.size}
				gridState={this.state.gridState}
				xIsNext={this.state.xIsNext}
				nodeClicked={this.nodeClicked.bind(this)}
			/>
		);
	}
}

export default Game;
