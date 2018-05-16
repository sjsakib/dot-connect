import React, { Component } from 'react';
import Node from './Node';

class Grid extends Component {
	isSelected(i, j) {
		const lastClicked = this.props.lastClicked;
		return lastClicked && lastClicked.r === i && lastClicked.c === j;
	}

	highlight(i, j) {
		const lastMoved = this.props.lastMoved;
		if (!lastMoved || !(lastMoved.node.r === i && lastMoved.node.c === j)) return 'none';
		if (lastMoved.line === 'horizontal') return 'right';
		if (lastMoved.line === 'vertical') return 'down';
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
					highlight={this.highlight(i, j)}
					nodeClicked={props.nodeClicked}
				/>
			))
		);

		return (
			<div className="grid-container" style={{ width: props.size.c * 50 }}>
				{grid}
			</div>
		);
	}
}

export default Grid;
