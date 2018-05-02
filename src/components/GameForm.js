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
      isX: true,
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
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label class="label"> Players </label>
            <div className="field has-addons has-addons-centered">
              <p class="control">
                <input className="input" type="text" name="x" required defaultValue="X" placeholder="You" />
              </p>
              <p class="control">
                <a class="button is-static">VS</a>
              </p>
              <p className="control">
                <input className="input" type="text" name="o" required defaultValue="O" placeholder="Opponent"/>
              </p>
            </div>
          </div>
          <div className="field">
            <label class="label"> Size </label>
            <div className="field has-addons has-addons-centered">
              <p class="control">
              <input className="input" type="number" max="10" min="2" required name="r" defaultValue="7" />
              </p>
              <p class="control">
                <a class="button is-static">X</a>
              </p>
              <p className="control">
              <input className="input" type="number" max="10" min="2" required name="c" defaultValue="5" />
              </p>
            </div>
          </div>
          <div className="field">
            <label class="label"> First move </label>
            <div className="field is-grouped is-grouped-centered">
              <div class="control">
                <div class="select">
                  <select type="select" name="firstmove">
                    <option> You </option>
                    <option> Opponent </option>
                    <option> Random </option>
                  </select>
                </div>
              </div>
            </div>
          </div> 
            <button className="button is-primary" type="submit">Go</button>
        </form>
      </div>
    )
  }
}


export default connect()(GameForm)
