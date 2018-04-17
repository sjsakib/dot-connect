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

    this.props.dispatch({
      type: 'RESET_GAME',
      players: {
        x: form.x.value.trim(),
        o: form.o.value.trim(),
      },
      size: {
        r: Number(form.r.value),
        c: Number(form.c.value),
      }
    });

    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/game" />
    }

    return (
      <div className="home-ui">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <center>
            <label> Players: </label>
            <br />
            <input type="text" name="x" defaultValue="X" /> VS
            <input type="text" name="o" defaultValue="O" />
            <br />
            <label> Size: </label>
            <br />
            <input type="number" max="10" min="2" name="r" defaultValue="7" /> X
            <input type="number" max="10" min="2" name="c" defaultValue="5" />
            <br />
            <button type="submit">Go</button>
          </center>
        </form>
      </div>
    )
  }
}


export default connect()(GameForm)
