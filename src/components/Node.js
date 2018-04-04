import React, { Component } from 'react';

class Node extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.nodeClicked(this.props.r, this.props.c);
	}

	render() {
		const props = this.props;

		return (
			<div className="node">
				<div className="core" onClick={this.handleClick} />
				<div className={`edge down ${!props.down ? 'off' : ''}`} />
				<div className={`edge right ${!props.right ? 'off' : ''}`} />
				<div className="owner">{props.owner}</div>
			</div>
		);
	}
}

export default Node;
