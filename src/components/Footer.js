import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const GameInfo = (props) =>  (
  <div className="game-footer">
    <center>
      {props.gameStatus}
      <br/>
      <span style={{color: props.connected.x ? 'green' : 'grey'}}> ∙ </span>
      {props.score}
      <span style={{color: props.connected.o ? 'green' : 'grey'}}> ∙ </span>
      <br/> <br/>
      <Link to="/"> Go Back </Link>
    </center>
  </div>
)

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  score: `${state.players.x} | ${state.score.x} : ${state.score.o} | ${state.players.o}`,
  connected: state.connected,
})

export default connect(mapStateToProps)(GameInfo)
