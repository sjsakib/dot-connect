import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';

class Game extends Component {
	render() {
		return (
			<Grid
				size={this.props.size}
				gridNodes={this.props.gridNodes}
				xIsNext={this.props.xIsNext}
				score={this.props.score}
				nodeClicked={this.props.nodeClicked}
				lastClicked={this.props.lastClicked}
			/>
		);
	}
}

Game.propTypes = {
	size: PropTypes.shape({
		r: PropTypes.number.isRequired,
		c: PropTypes.number.isRequired
	}).isRequired,

	gridNodes: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				right: PropTypes.bool.isRequired,
				down: PropTypes.bool.isRequired,
				owner: PropTypes.string
			}).isRequired
		).isRequired
	).isRequired,

	lastClicked: PropTypes.shape({
		r: PropTypes.number.isRequired,
		c: PropTypes.number.isRequired,
	}),

	xIsNext: PropTypes.bool.isRequired,

	score: PropTypes.shape({
		x: PropTypes.number.isRequired,
		o: PropTypes.number.isRequired,
	}).isRequired,
}

export default Game;
