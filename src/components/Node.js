import React, { Component } from 'react';

class Node extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.nodeClicked({
			r: this.props.r,
			c: this.props.c
		});
	}

	getSelectedClass() {
		return this.props.selected ? 'selected' : '';
	}

	render() {
		const props = this.props;

		return (
			<div className="node">
				<div
					className={`core ${this.getSelectedClass()}`}
					onMouseDown={this.handleClick}
					onMouseUp={this.handleClick}
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
