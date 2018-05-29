import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../config';

class ActiveGames extends Component {
	constructor(props) {
		super(props);
		this.state = { status: 'loading', games: [] };
	}
	componentDidMount() {
		fetch(apiUrl + '/active-games')
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: 'loaded',
					games: data,
				});
			})
			.catch(err => {
				this.setState({ status: 'failed' });
				// throw err;
			});
	}

	render() {
		const { status, games } = this.state;
		if ( status === 'loading' || status === 'failed' ) {
			return null;
		}

		const gameRows = games.map(game => (
			<tr key={game.gameId}>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.gameId}</Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.name} </Link> </td>
				<td> <Link to={`/game/${game.gameId}/play`}>{game.size} </Link> </td>
			</tr> 
		));

		return (
	        <div>
	            {gameRows.length > 0 && (
	                <div>
	                    <p className="subtitle has-text-grey">
	                        <br />
	                        Following games being played right now. Watch live
	                    </p>
	                    <table className="table is-centered game-table">
	                        <thead>
	                            <tr>
	                                <td>ID</td>
	                                <td>Players</td>
	                                <td>Size</td>
	                            </tr>
	                        </thead>
	                        <tbody>{gameRows}</tbody>
	                    </table>
	                </div>
	            )}
	        </div>
	    );
	}
}

export default ActiveGames;
