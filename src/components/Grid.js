import React, { Component } from 'react';
import Node from './Node';

class Grid extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const props = this.props;
		const grid = props.gridState.map((rowState, i) =>
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
