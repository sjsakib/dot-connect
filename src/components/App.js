import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import GameContainer from '../containers/GameContainer';
import GameForm from '../components/GameForm';
import JoinForm from '../components/JoinForm';
import Home from '../components/Home';
import Rules from '../components/Rule';
import GameList from '../components/GameList';
import TopChart from '../components/TopChart';
import ClientSocket from '../utilities/ClientSocket';
import * as auth from '../utilities/auth';

class App extends Component {
    constructor(props) {
        super(props);

        auth.initFb(props.dispatch);
        auth.loadUser(props.dispatch);

        this.ClientSocket = new ClientSocket(this);
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
                        render={props => <GameContainer socket={socket} {...props} />}
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
                        path="/game/start/offline"
                        render={props => (
                            <GameForm socket={socket} {...props} offline={true} />
                        )}
                    />
                    <Route
                        exact
                        path="/game/:gameId/join"
                        render={props => (
                            <JoinForm socket={socket} {...props} />
                        )}
                    />
                    <Route exact path="/user/:userId/games" component={GameList}/>
                    <Route exact path="/topchart" component={TopChart} />
                    <Route exact path="/rules" component={Rules} />
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
