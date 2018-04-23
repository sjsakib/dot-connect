import React from 'react';
import '../css/index.css';
import GameContainer from '../containers/GameContainer';
import GameForm from '../components/GameForm'
import Menu from '../components/Menu'
import Rules from '../components/Rule'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Menu}/>
      <Route exact path="/game" component={GameContainer}/>
      <Route exact path="/game/start" component={GameForm}/>
      <Route exact path="/rules" component={Rules}/>
    </div>
  </Router>
)

export default App;
