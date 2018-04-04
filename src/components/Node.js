import React, { Component } from 'react';

class Node extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedClass: ''
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState({ selectedClass: '-selected' });
		this.props.nodeClicked({
			row: this.props.r,
			col: this.props.c
		});
	}

	render() {
		const props = this.props;

		return (
			<div className="node">
				<div
					className={`core${this.state.selectedClass}`}
					onClick={this.handleClick}
				/>
				<div className={`edge ${props.right ? 'right' : ''}`} />
				<div className={`edge ${props.down ? 'down' : ''}`} />
				<div className="owner">{props.owner}</div>
			</div>
		);
	}
}

export default Node;
