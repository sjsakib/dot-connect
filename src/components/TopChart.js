import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../config';

class TopChart extends Component {
	constructor(props) {
		super(props);
		this.state = { status: 'loading' };
	}
	componentDidMount() {
		fetch(apiUrl + '/topchart')
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: 'loaded',
					users: data,
				});
			})
			.catch(err => {
				this.setState({ status: 'failed' });
				// throw err;
			});
	}

	render() {
		const { status, users } = this.state;
		if ( status === 'loading' ) {
			return <div> Loading... </div>;
		} else if ( status === 'failed' ) {
			return <div> Failed to load </div>;
		}

		let usersTable = users.map((user, i) => (
			<tr key={i}>
				<td> <Link to={`/user/${user.id}/games`}>{i}</Link> </td>
				<td> <Link to={`/user/${user.id}/games`}>{user.name}</Link> </td>
				<td> <Link to={`/user/${user.id}/games`}>{user.points} </Link> </td>
			</tr> 
		));
		if ( usersTable.length > 0 ) {
			usersTable = (
				<table className="table is-centered game-table">
					<thead>
						<tr>
							<td>#</td>
							<td>Name</td>
							<td>Points</td>
						</tr>
					</thead>
					<tbody>{usersTable}</tbody>
				</table>
			);
		} else {
			usersTable = null;
		}

		return (
			<div>
				<p className="title has-text-grey">
					Top players
				</p>
				{usersTable}
			</div>
		)
	}
}

export default TopChart;
