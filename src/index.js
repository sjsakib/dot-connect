import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Node(props) {
  return (
    <div className="node">
      <div className="core" onClick={() => props.nodeClicked(props.r, props.c)}></div>
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
        nodeClicked={props.nodeClicked}
      />
    ))
  ));

  return (
    <div className="container" style={{width: props.size*50}}>
      {grid}
    </div>
  )
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    const size = props.size;
    this.state = {
      size: size,
      lastClicked: null,
      gridState: Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({
        right: false,
        down: false,
        owner: null,
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
    const [rr, cc] = lastClicked;
    if(Math.abs(rr - r) === 1 && cc === c) {
      gridState[rr < r ? rr : r][c].down = true;
    } else if(Math.abs(cc - c) === 1 && rr === r) {
      gridState[r][cc < c ? cc : c].right = true;
    } else {
      this.setState({
        lastClicked: [r, c],
      });
      return;
    }
    this.setState({
      gridState: gridState,
      lastClicked: null,
    });
  }

  render() {
    return (
      <Grid
        size={this.state.size}
        gridState={this.state.gridState}
        nodeClicked={this.nodeClicked.bind(this)}
      />
    )
  }
}


ReactDom.render(
    <Game 
      size={7}
    />,
    document.getElementById('root')
);
