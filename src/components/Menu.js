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
    </div>
  )
}

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  gameId: state.gameId,
})

export default connect(mapStateToProps)(Home)
