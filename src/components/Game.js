import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import GameInfo from './Footer';
import { ShareLink } from './utilities';
import { siteUrl } from '../config.js';

class Game extends Component {
	constructor(props) {
		super(props);

		if ( this.props.offline ) return;

		this.props.socket.emit('JOIN_GAME', {
			gameId: props.match.params.gameId,
			userId: props.user.id
		});
		
		this.props.dispatch({
			type: 'UPDATE_STATE',
			data: {
				status: 'waiting_for_response',
			}
		});
	}

	componentDidMount() {
		this.answer();
	}
	componentDidUpdate() {
		this.answer();

		// change document title
		document.title = this.props.gameStatus + ' | DotConnect'

		// REQUEST_GAME_INFO might have been replied before the game is saved in db
		// should try again
		/*if (this.props.status === 'not_found' && this.props.connected) {
			this.props.socket.emit('REQUEST_GAME_INFO', {
				gameId: this.props.match.params.gameId,
				userId: this.props.user.id,
			});
			this.props.dispatch({
				type: 'UPDATE_STATE',
				data: {
					status: 'waiting_for_response',
				}
			});
		}*/
	}

	answer() {
		if ( !this.props.xIsNext && this.props.offline  ) {
			setTimeout(() => {
				this.props.dispatch({
					type: 'ANSWER',
					after: this.sendState.bind(this),
				});
			}, 1000);
		}
	}

	sendState(state) {
		this.props.socket.emit('SYNC', {
			gameId: state.gameId,
			gridNodes: state.gridNodes,
			xIsNext: state.xIsNext,
			gameStatus: state.gameStatus,
			score: state.score,
			status: state.status,
			lastMoved: state.lastMoved,
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
		if( this.props.status === 'waiting_for_opponent' && this.props.users.x === this.props.user.id) {
			const path = siteUrl + `/game/${this.props.gameId}/join`
			return <ShareLink value={path}/>
		} else if ( this.props.status === 'not_started') {
			return <div>Loading...</div>;
		} else if( this.props.status === 'not_found' ) {
			return <div>Game does not exists or expired</div>;
		} else if ( this.props.status === 'waiting_for_response' || !this.props.size ) {
			return <div>Connecting... </div>;
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
						lastMoved={this.props.lastMoved}
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
