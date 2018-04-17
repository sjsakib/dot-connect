import React, { Component } from 'react';
import '../css/index.css';
import GameContainer from '../containers/GameContainer';
import GameForm from '../components/GameForm'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const Home = () => (
  <div className="home-ui">
    <li><Link to="/game">Go to game</Link></li>
    <li><Link to="/start-game">Start a new game</Link></li>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/game" component={GameContainer}/>
      <Route path="/start-game" component={GameForm}/>
    </div>
  </Router>
)

export default App;
