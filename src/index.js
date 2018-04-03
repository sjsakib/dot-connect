import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Node(props) {
  return (
    <div className="node">
      <div className="core"></div>
      <div className={`edge down ${!props.down ? 'off' : ''}`}></div>
      <div className={`edge right ${!props.right ? 'off' : ''}`}></div>
      <div className="owner">{props.owner}</div>
    </div>
  );
}

function Grid(props) {
  console.log(props);
  const grid = props.gridState.map((rowState, i) => (
    rowState.map((nodeState, j) => (
      <Node
        key={`${i} ${j}`}
        pos={{r: i, c: j}}
        down={nodeState.down}
        right={nodeState.right}
      />
    ))
  ))

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
      gridState: Array(size).fill(null).map(() => Array(size).fill(null).map(() => ({
        right: false,
        down: false,
        owner: null,
      }))),
    }
  }

  render() {
    return (
      <Grid
        size={this.state.size}
        gridState={this.state.gridState}
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
