import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import GameContainer from '../containers/GameContainer';
import GameForm from '../components/GameForm';
import JoinForm from '../components/JoinForm';
import Home from '../components/Home';
import Rules from '../components/Rule';
import ClientSocket from '../utilities/ClientSocket';

class App extends Component {
    constructor(props) {
        super(props);

        this.ClientSocket = new ClientSocket(props);
        this.ClientSocket.bindListeners();
    }

    render() {
        const socket = this.ClientSocket.getSocket();
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/game/:gameId/play"
                        render={() => <GameContainer socket={socket} />}
                    />
                    <Route
                        exact
                        path="/game/start"
                        render={props => (
                            <GameForm socket={socket} {...props} />
                        )}
                    />
                    <Route
                        exact
                        path="/game/:gameId/join"
                        render={props => (
                            <JoinForm socket={socket} {...props} />
                        )}
                    />
                    <Route exact path="/rules" component={Rules} />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
