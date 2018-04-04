import React, { Component } from 'react';
import Grid from './Grid';

class Game extends Component {
	constructor(props) {
		super(props);
		const size = this.props.size;

		this.state = {
			lastClicked: null,
			xIsNext: true, // Let's call the first player X
			gridBoxes: Array(size)
				.fill()
				.map(() =>
					Array(size)
						.fill()
						.map(() => ({
							top: false,
							left: false,
							right: false,
							down: false,
							count: 0,
							owner: null
						}))
				),
			gridNodes: Array(size)
				.fill()
				.map(() =>
					Array(size)
						.fill()
						.map(() => ({
							right: false,
							down: false
						}))
				)
		};

		this.nodeClicked = this.nodeClicked.bind(this);
		this.setAction = this.setAction.bind(this);
	}

	setAction(from, to) {
		if (
			Math.abs(from.row - to.row) === 1 &&
			Math.abs(from.col - to.col) === 0
		) {
			return {
				line: 'vertical',
				node: from.row > to.row ? to : from
			};
		} else if (
			Math.abs(from.row - to.row) === 0 &&
			Math.abs(from.col - to.col) === 1
		) {
			return {
				line: 'horizontal',
				node: from.col > to.col ? to : from
			};
		} else {
			return {
				line: null
			};
		}
	}

	nodeClicked(clickedNode) {
		console.log(`clicked ${clickedNode.row}, ${clickedNode.col}`);

		const lastClicked = this.state.lastClicked;
		if (!lastClicked) {
			this.setState({
				lastClicked: clickedNode
			});
		} else {
			const action = this.setAction(this.state.lastClicked, clickedNode);
			this.setState(prevState => {
				const gridState = prevState.gridNodes.slice();

				if (action.line === 'vertical') {
					gridState[action.node.row][action.node.col].down = true;
				} else if (action.line === 'horizontal') {
					gridState[action.node.row][action.node.col].right = true;
				}

				return {
					lastClicked: action.line ? null : prevState.lastClicked,
					xIsNext: !prevState.xIsNext,
					gridNodes: gridState
				};
			});
		}

		// let gridNodes = this.state.gridNodes.slice();
		// const [rr, cc] = lastClicked;
		// if (Math.abs(rr - r) === 1 && cc === c) {
		// 	r = rr < r ? rr : r;
		// 	gridNodes[r][c].down = true;
		// 	if (c !== 0) this.updateOwner(r, c - 1);
		// } else if (Math.abs(cc - c) === 1 && rr === r) {
		// 	c = cc < c ? cc : c;
		// 	gridNodes[r][c].right = true;
		// 	if (r !== 0) this.updateOwner(r - 1, c);
		// } else {
		// 	this.setState({
		// 		lastClicked: [r, c]
		// 	});
		// 	return;
		// }
		// this.updateOwner(r, c);
		// this.setState({
		// 	gridNodes: gridNodes,
		// 	lastClicked: null,
		// 	xIsNext: !this.state.xIsNext
		// });
	}

	updateOwner(r, c) {
		console.log(r, c);
		let gridNodes = this.state.gridNodes;
		let size = this.props.size;
		if (r === size - 1 || c === size - 1 || gridNodes[r][c].owner) {
			return;
		}
		if (
			gridNodes[r][c].right &&
			gridNodes[r][c].down &&
			gridNodes[r + 1][c].right &&
			gridNodes[r][c + 1].down
		) {
			gridNodes[r][c].owner = this.state.xIsNext ? 'X' : 'O';
			this.setState({
				gridNodes: gridNodes
			});
		}
	}

	render() {
		return (
			<Grid
				size={this.props.size}
				gridNodes={this.state.gridNodes}
				xIsNext={this.state.xIsNext}
				nodeClicked={this.nodeClicked}
			/>
		);
	}
}

export default Game;
