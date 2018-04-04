import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Node(props) {
  return (
    <div className="node">
      <div className={`core ${props.highlight ? 'highlight' : ''}`}
        onClick={() => props.nodeClicked(props.r, props.c)}>
      </div>
      <div className={`edge down ${!props.down ? 'off' : ''}`}></div>
      <div className={`edge right ${!props.right ? 'off' : ''}`}></div>
      <div className="owner">{props.owner}</div>
    </div>
  );
}

function Grid(props) {
  const grid = props.gridState.map((rowState, i) => (
    rowState.map((nodeState, j) => (
      <Node
        key={`${i} ${j}`}
        r={i}
        c={j}
        down={nodeState.down}
        right={nodeState.right}
        owner={nodeState.owner}
        highlight={props.lastClicked && (props.lastClicked[0] === i && props.lastClicked[1] === j)}
        nodeClicked={props.nodeClicked}
      />
    ))
  ));

  return (
    <div className="grid-container" style={{width: props.size*50}}>
      {grid}
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    const size = this.props.size;
    this.state = {
      lastClicked: undefined,
      xIsNext: true, // Let's call the first player X
      gridState: Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({
        right: false,
        down: false,
        owner: undefined,
      }))),
    }
  }

  nodeClicked(r, c) {
    console.log(`clicked ${r}, ${c}`)
    const lastClicked = this.state.lastClicked;
    if(! lastClicked ) {
      this.setState({
        lastClicked: [r, c] 
      });
      return;
    }

    let gridState = this.state.gridState.slice();
    let owned = false; // this move gave ownership?
    const [rr, cc] = lastClicked;
    const mr = Math.min(rr, r);
    const mc = Math.min(cc, c);

    if(Math.abs(rr - r) === 1 && cc === c && !gridState[mr][mc].down) {
      gridState[mr][mc].down = true;
      if(mc !== 0) owned = this.updateOwner(mr, mc-1) || owned;

    } else if(Math.abs(cc - c) === 1 && rr === r && !gridState[mr][mc].right) {
      gridState[mr][mc].right = true;
      if(mr !== 0) owned = this.updateOwner(mr-1, mc) || owned;

    } else {
      this.setState({
        lastClicked: [r, c],
      });
      return;
    }
    owned = this.updateOwner(mr, mc) || owned;
    this.setState({
      gridState: gridState,
      lastClicked: undefined,
      xIsNext: owned ? this.state.xIsNext : !this.state.xIsNext,
    });

  }

  updateOwner(r, c) {
    let gridState = this.state.gridState;
    let size = this.props.size;
    if( r === size-1 || c === size-1 || gridState[r][c].owner) {
      return false;
    }
    if(gridState[r][c].right && gridState[r][c].down &&
        gridState[r+1][c].right && gridState[r][c+1].down) {
      gridState[r][c].owner = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        gridState: gridState,
      });
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="game-container" style={{width: (this.props.size-1)*50}}>
        <Grid
          size={this.props.size}
          gridState={this.state.gridState}
          lastClicked={this.state.lastClicked}
          nodeClicked={this.nodeClicked.bind(this)}
        />
        <p>To move: {this.state.xIsNext ? 'X' : 'O'} </p>
      </div>
    )
  }
}


ReactDom.render(
    <Game 
      size={7}
    />,
    document.getElementById('root')
);
