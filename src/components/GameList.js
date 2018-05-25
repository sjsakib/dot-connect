import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HomeLink } from './utilities'
import { apiUrl } from '../config';

class GameList extends Component {
	constructor(props) {
		super(props);
		this.state = { status: 'loading' };
	}
	componentDidMount() {
		fetch(apiUrl + '/game-list/' + this.props.match.params.userId)
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: 'loaded',
					name: data.name,
					current: data.current,
					finished: data.finished
				});
			})
			.catch(err => {
				this.setState({ status: 'failed' });
				// throw err;
			});
	}

	render() {
		const { status, name, current, finished } = this.state;
		if ( status === 'loading' ) {
			return <div> Loading... </div>;
		} else if ( status === 'failed' ) {
			return <div> Failed to load </div>;
		}

		let currentGames = current.map(game => (
			<tr key={game.gameId}>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.gameId}</Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.name} </Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.size} </Link> </td>
			</tr> 
		));
		if ( currentGames.length > 0 ) {
			currentGames = (
				<div>
					<p className="subtitle has-text-grey">
						Games In Progress
					</p>
					<table className="table is-centered game-table">
						<thead>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Size</td>
							</tr>
						</thead>
						<tbody>{currentGames}</tbody>
					</table>
				</div>
			);
		} else {
			currentGames = null;
		}

		let finishedGames = finished.map(game => (
			<tr key={game.gameId}>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.gameId}</Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.name} </Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.size} </Link> </td>
			</tr> 
		));
		if ( finishedGames.length > 0 ) {
			finishedGames = (
				<div>
					<p className="subtitle has-text-grey">
						Finished Games
					</p>
					<table className="table is-centered game-table">
						<thead>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Size</td>
							</tr>
						</thead>
						<tbody>{finishedGames}</tbody>
					</table>
				</div>
			);
		} else {
			finishedGames = null;
		}
		return (
			<div>
				<p className="title has-text-grey">
					Games of {name}
				</p>
				{currentGames}
				{finishedGames}
				{!(currentGames || finishedGames) &&
					<div>Nothing to show</div>
				}
				<HomeLink />
			</div>
		)
	}
}

export default GameList;
