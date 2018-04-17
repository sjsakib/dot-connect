import React, { Component } from 'react';
import '../css/index.css';
import GameContainer from '../containers/GameContainer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const Game = () => (
  <div className="game-ui">
    <GameContainer />
    <div className="ui-link"><Link to='/'>Go Back</Link></div>
  </div>
)


const Home = () => (
  <div className="home-ui">
    <div className="ui-link"><Link to="/game">Go To Game</Link></div>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/game" component={Game}/>
    </div>
  </Router>
)

export default App;
