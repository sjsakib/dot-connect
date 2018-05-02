import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


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
      <h3 className="title has-text-grey">Dot Connect</h3>
      <p className="subtitle has-text-grey">Play the childhood game online with friends</p>
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
