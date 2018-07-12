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
      gameId: Math.random().toString(36).substr(2,5),
      size: size,
      step: 0,
      lastClicked: null,
      xIsNext: xIsNext,
      isX: true,
      score: {
        x: 0,
        o: 0,
      },
      players: players,
      users: {
        x: this.props.user.id,
        o: null,
      },
      connected: {
        x: true,
        o: false,
      },
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
        ),
      public: form.public.checked,
    };

    if(this.props.offline) {
      gameData.status = 'started';
      gameData.connected.o = true;
      gameData.offline = true;
      gameData.public = false;
    }

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

    let xName = this.props.user.name;
    xName = xName.startsWith('Guest') ? 'X' : xName;
    const oName = this.props.offline ? 'Computer': 'O';
    const maxSize = this.props.offline ? 8 : 1000;

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label className="label"> Players </label>
            <div className="field has-addons has-addons-centered">
              <p className="control">
                <input className="input" type="text" name="x" required defaultValue={xName} placeholder="You" />
              </p>
              <p className="control">
                <a className="button is-static">VS</a>
              </p>
              <p className="control">
                <input className="input" type="text" name="o" required defaultValue={oName} placeholder="Opponent"/>
              </p>
            </div>
          </div>
          <div className="field">
            <label className="label"> Size </label>
            <div className="field has-addons has-addons-centered">
              <p className="control">
              <input className="input" type="number" max={maxSize} min="2" required name="r" defaultValue="7" />
              </p>
              <p className="control">
                <a className="button is-static">X</a>
              </p>
              <p className="control">
              <input className="input" type="number" max={maxSize} min="2" required name="c" defaultValue="5" />
              </p>
            </div>
          </div>
          <div className="field">
            <label className="label"> First move </label>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <div className="select">
                  <select type="select" name="firstmove">
                    <option> You </option>
                    <option> Opponent </option>
                    <option> Random </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <label className="checkbox">
            <input type="checkbox" name="public" defaultChecked />
              Anyone can join
          </label>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary back" type="submit">Go</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps)(GameForm)
