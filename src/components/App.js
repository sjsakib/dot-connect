import React, { Component } from 'react';
import { connect } from 'react-redux'
import '../css/index.css';
import GameContainer from '../containers/GameContainer';
import GameForm from '../components/GameForm'
import JoinForm from '../components/JoinForm'
import Menu from '../components/Menu'
import Rules from '../components/Rule'
import io from 'socket.io-client'
import { apiUrl } from '../config.js'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const socket = io(apiUrl);

class App extends Component {
  constructor() {
    super();
    socket.on('SYNC', (data) => {
      this.props.dispatch({
        type: 'UPDATE_STATE',
        data: data,
      })
    });

    socket.on('UPDATE_GAME_LIST', (data) => {
      this.props.dispatch({
        type: 'UPDATE_GAME_LIST',
        data: data,
      });
    });

    socket.on('reconnect', () => {
      console.log('reconnected...');
      if(this.props.status === 'started') {
        console.log('rejoining...');
        socket.emit('REJOIN', {
          gameId: this.props.gameId,
          gridNodes: this.props.gridNodes,
          xIsNext: this.props.xIsNext,
          score: this.props.score,
          gameStatus: this.props.gameStatus,
        });
      }
      this.props.dispatch({
        type: 'CONNECTION_CHANGED',
        self: true,
        connected: true,
      })
    });

    socket.on('disconnect', () => {
      console.log('disconnected...')
      this.props.dispatch({
        type: 'CONNECTION_CHANGED',
        self: true,
        connected: false,
      });
    });

    socket.on('PEER_DISCONNECTED', () => {
      this.props.dispatch({
        type: 'CONNECTION_CHANGED',
        self: false,
        connected: false
      });
    });

    socket.on('PEER_CONNECTED', () => {
      console.log('peer connected');
      this.props.dispatch({
        type: 'CONNECTION_CHANGED',
        self: false,
        connected: true
      });
    });

    socket.on('CONNECTED', () => {
      this.props.dispatch({
        type: 'CONNECTION_CHANGED',
        self: true,
        connected: true
      });
    });

  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Menu}/>
          <Route
            exact
            path="/game/:gameId/play"
            render={()=><GameContainer socket={socket}/>}
          />
          <Route
            exact
            path="/game/start"
            render={(props)=><GameForm socket={socket} {...props}/>}
          />
          <Route
            exact
            path="/game/:gameId/join"
            render={(props)=><JoinForm socket={socket} {...props}/>}
          />
          <Route exact path="/rules" component={Rules}/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
