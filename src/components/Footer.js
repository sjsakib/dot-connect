import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


const GameInfo = (props) =>  (
  <div className="game-footer">
    <center>
      {props.gameStatus}
      <br/>
      {props.score}
      <br/> <br/>
      <Link to="/"> Go Back </Link>
    </center>
  </div>
)

const mapStateToProps = state => ({
  gameStatus: state.gameStatus,
  score: `${state.players.x} | ${state.score.x} : ${state.score.o} | ${state.players.o}`
})

export default connect(mapStateToProps)(GameInfo)
