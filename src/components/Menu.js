import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const Home = (props) => {
  let item;
  const status = props.gameStatus;
  if (status.includes('not started')) {
    item = null;
  } else {
    const path = `/game/${props.gameId}/play`;
    item = <li><Link to={path}>Go back to game</Link></li>
  }

  let gameTable = null;
  const gameList = [];
  const allGames = props.availableGames;
  for (const gameId in allGames) {
    const game = allGames[gameId];
    const path = `/game/${gameId}/join`;
    gameList.push(
      <tr key={gameId}>
        <td>{game.players.x}</td>
        <td>{`${game.size.r}x${game.size.c}`}</td>
        <td>
          <span className="button is-link is-small">
            <Link to={path}>Join</Link>
          </span>
        </td>
      </tr>
    );
  }
  if (gameList.length > 0) {
    gameTable = (
      <div>
        <p className="subtitle has-text-grey"> Join a game</p>
        <table className="table is-centered game-table">
          <thead>
            <tr>
              <td>Challenger</td>
              <td>Size</td>
            </tr>
          </thead>
          <tbody>
            {gameList}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <img src={logo} alt="DOT CONNECT" />
      <p className="subtitle has-text-grey">Play your favorite childhood game online with friends</p>
      <div className="box">
        <ul className="menu-list">
          {item}
          <li><Link to="/game/start">Start a new game</Link></li>
          <li><Link to="/rules">Rules</Link></li>
        </ul>
      </div>
      {gameTable}
    </div>
  )
}

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  gameId: state.gameId,
  availableGames: state.availableGames,
})

export default connect(mapStateToProps)(Home)
