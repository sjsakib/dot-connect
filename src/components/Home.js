import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import Menu from './Menu';
import PublicGameList from './PublicGameList';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src={logo} alt="DOT CONNECT" />
                <p className="subtitle has-text-grey">
                    Play your favorite childhood game online with friends
                </p>

                <Menu
                    gameStatus={this.props.gameStatus}
                    gameId={this.props.gameId}
                />
                <PublicGameList games={this.props.availableGames} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    gameStatus: state.gameStatus,
    gameId: state.gameId,
    availableGames: state.availableGames
});

export default connect(mapStateToProps)(Home);
