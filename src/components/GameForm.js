import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class GameForm extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const firstmove = form.firstmove.value;
    const xIsNext = (firstmove === 'Random' ? Math.random() > .5 : firstmove === 'You');

    const players = {
      x: form.x.value.trim(),
      o: form.o.value.trim(),
    }
    const size = {
      r: Number(form.r.value),
      c: Number(form.c.value),
    }
    const gameData = {
      gameId: Math.floor(Math.random() * 100000),
      size: size,
      lastClicked: null,
      xIsNext: xIsNext,
      score: {
        x: 0,
        o: 0,
      },
      players: players,
      gameStatus: `To move: ${xIsNext ? players.x : players.o}`,
      status: 'waiting_for_opponent',
      gridNodes: Array(size.r)
        .fill()
        .map(() =>
          Array(size.c)
          .fill()
          .map(() => ({
            right: false,
            down: false,
            owner: null
          }))
        )
    };

    this.props.socket.emit('NEW_GAME', gameData)
    this.props.dispatch({
      type: 'UPDATE_STATE',
      data: gameData,
    });

    this.setState({
      redirect: true,
      gameId: gameData.gameId,
    });
  }

  render() {
    if (this.state.redirect) {
      const path = `/game/${this.state.gameId}/play`
      return <Redirect to={path} />
    }

    return (
      <div className="home-ui">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <center>
            <label> Players: </label>
            <br />
            You: <input type="text" name="x" required defaultValue="Ami" /> <br/>
            Opponent: <input type="text" name="o" required defaultValue="Tumi" />
            <br />
            <label> Size: </label>
            <br />
            <input type="number" max="10" min="2" required name="r" defaultValue="7" /> X
            <input type="number" max="10" min="2" required name="c" defaultValue="5" />
            <br />
            First move: <br/>
            <select type="select" name="firstmove">
              <option> You </option>
              <option> Opponent </option>
              <option> Random </option>
            </select>
            <br/> <br/> 
            <button type="submit">Go</button>
          </center>
        </form>
      </div>
    )
  }
}


export default connect()(GameForm)
