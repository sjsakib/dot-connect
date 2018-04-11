import React, { Component } from 'react';
import Node from './Node';

class Grid extends Component {
	isSelected(i, j) {
		const lastClicked = this.props.lastClicked;
		return lastClicked && lastClicked.r === i && lastClicked.c === j;
	}

	render() {
		const props = this.props;
		const grid = props.gridNodes.map((rowState, i) =>
			rowState.map((nodeState, j) => (
				<Node
					key={`${i} ${j}`}
					r={i}
					c={j}
					down={nodeState.down}
					right={nodeState.right}
					owner={nodeState.owner}
					selected={this.isSelected(i, j)}
					nodeClicked={props.nodeClicked}
				/>
			))
		);

		return (
			<div className="container" style={{ width: (props.size-1) * 50 }}>
				<div className="grid-container" style={{ width: props.size * 50 }}>
					{grid}
				</div>
				<p className='game-info'>
					To move: {props.xIsNext ? 'X' : 'O'} <br/>
					<br/>
					X - {this.props.score.x} : {this.props.score.o} - O
				</p>
			</div>
		);
	}
}

export default Grid;
