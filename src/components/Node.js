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
	getEdgeClass(edge) {
		let ret = 'edge ';
		if (this.props[edge]) ret += edge + ' ';
		if (this.props.highlight === edge) ret += 'highlight';
		return ret;
	}

	render() {
		const props = this.props;

		return (
			<div className="node">
				<div className={`core ${this.getSelectedClass()}`} />
				<div className="outer-core" onClick={this.handleClick} />
				<div className={this.getEdgeClass('right')} />
				<div className={this.getEdgeClass('down')} />
				<div className="owner">{props.owner}</div>
			</div>
		);
	}
}

export default Node;
