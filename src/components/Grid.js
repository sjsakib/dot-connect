import React, { Component } from 'react';
import Node from './Node';

class Grid extends Component {
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
					nodeClicked={props.nodeClicked}
				/>
			))
		);

		return (
			<div className="container" style={{ width: props.size * 50 }}>
				{grid}
				<p> To move: {props.xIsNext ? 'X' : 'O'}</p>
			</div>
		);
	}
}

export default Grid;
