import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from './Grid';

class Game extends Component {
	render() {
		return (
			<div>
				<div className="container" style={{ width: (this.props.size.c-1) * 50 }}>
					<Grid
						size={this.props.size}
						gridNodes={this.props.gridNodes}
						xIsNext={this.props.xIsNext}
						nodeClicked={this.props.nodeClicked}
						lastClicked={this.props.lastClicked}
					/>
				</div>
				<div className="game-footer">
					<center>
						To move: {this.props.xIsNext ? 'X' : 'O'}
						<br/>
						X - {this.props.score.x} : {this.props.score.o} - O
						<br/> <br/>
						<Link to="/"> Go Back </Link>
					</center>
				</div>
			</div>
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
