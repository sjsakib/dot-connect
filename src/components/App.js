import React, { Component } from 'react';
import '../css/index.css';
import Game from './Game';

class App extends Component {
	render() {
		return <Game size={8} />;
	}
}

export default App;
