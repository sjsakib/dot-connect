import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class GameForm extends Component {
  render() {
    return (
      <div className="home-ui">
        <form>
          <center>
            <label> Players: </label>
            <br />
            <input type="text" name="x" value="X" /> VS
            <input type="text" name="o" value="O" />
            <br />
            <label> Size: </label>
            <br />
            <input type="number" max="10" name="r" value="7" /> X
            <input type="number" max="10" name="c" value="5" />
            <br />
            <Link to="/game"> <button type="submit">Go</button> </Link>
          </center>
        </form>
      </div>
    )
  }
}


export default GameForm
