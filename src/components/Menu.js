import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const Home = (props) => {
  let item;
  const status = props.gameStatus;
  if (status.includes('not started')) {
    item = null;
  } else {
    item = <li><Link to="/game">Go back to game</Link></li>
  }

  return (
    <div className="home-ui">
      {item}
      <li><Link to="/game/start">Start a new game</Link></li>
      <li><Link to="/rules">Rules</Link></li>
    </div>
  )
}

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
})

export default connect(mapStateToProps)(Home)
