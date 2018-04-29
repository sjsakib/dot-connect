import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import GameInfo from './Footer';
import { ShareLink, MiddleText } from './utilities'
import { siteUrl } from '../config.js'

class Game extends Component {
	sendState(state) {
		this.props.socket.emit('SYNC', {
			gameId: state.gameId,
			gridNodes: state.gridNodes,
			xIsNext: state.xIsNext,
			gameStatus: state.gameStatus,
			score: state.score,
		});
	}

	nodeClicked(node) {
		this.props.dispatch({
			type: 'NODE_CLICKED',
			node: node,
			after: this.sendState.bind(this),
		})
	}

	render() {
		if( this.props.status === 'waiting_for_opponent' ) {
			const path = siteUrl + `/game/${this.props.gameId}/join`
			return <ShareLink value={path}/>
		}

		if( !this.props.size ) {
			return <MiddleText element="Game does not exists or expired" />;
		}
		return (
			<div>
				<div className="container" style={{ width: (this.props.size.c-1) * 50 }}>
					<Grid
						size={this.props.size}
						gridNodes={this.props.gridNodes}
						xIsNext={this.props.xIsNext}
						nodeClicked={this.nodeClicked.bind(this)}
						lastClicked={this.props.lastClicked}
					/>
				</div>
				<GameInfo />
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
