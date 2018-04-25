import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import MiddleText from './MiddleText'

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };

    const gameId = this.props.match.params.gameId;

    this.props.socket.emit('REQUEST_GAME_INFO', gameId)
    this.props.dispatch({
      type: 'UPDATE_STATE',
      data: {
        status: 'waiting_for_response',
        gameId: gameId,
      }
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    this.props.socket.emit('JOIN_GAME', this.props.match.params.gameId)
    this.props.dispatch({
      type: 'UPDATE_STATE',
      data: {
        players:
          x: this.props.players.x,
          o: form.o.value.trim(),
    });

    const gameId = this.props.match.params.gameId;
    this.setState({
      redirect: true,
      gameId: gameId,
    });
  }

  render() {
    if (this.state.redirect) {
      const path = `/game/${this.state.gameId}/play`
      return <Redirect to={path} />
    }

    const connecting = <MiddleText text="Connecting..." />;

    if (this.props.status === 'waiting_for_response' || !this.props.status) {
      return connecting;
    }

    const playerX = this.props.players.x;
    const playerO = this.props.players.o;

    return (
      <div className="home-ui">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <center>
            <label> Players: </label>
            <br />
            You: <input type="text" name="o" required defaultValue={playerO} /> <br/>
            Opponent: <input type="text" name="x" required disabled defaultValue={playerX} />
            <br />
            <label> Size: </label>
            <br />
            <input type="number" max="10" min="2" name="r" defaultValue={this.props.size.r} required disabled/> X
            <input type="number" max="10" min="2" name="c" defaultValue={this.props.size.c} required disabled/>
            <br/> <br/> 
            <button type="submit">Join</button>
          </center>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  players: state.players,
  size: state.size,
  status: state.status,
})


export default connect(
  mapStateToProps
)(JoinForm)
