import React from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Node(props) {
  return (
    <div className={`node ${props.sideClass}`}>
      <div className="core"></div>
      <div className={`edge right ${!props.right ? 'off': ''}`}></div>
      <div className={`edge down ${!props.down ? 'off': ''}`}></div>
      <div className="owner">{props.owner}</div>
    </div>
  );
}

function Grid(props) {
  let grid = [];
  const size = props.size;
  for (let i = 0; i<size; i++) {
    for (let j = 0; j<size; j++) {
      let side = '';
      if (j === size-1) {
        side += 'right-side';
      }
      if (i === size-1) {
        side += ' down-side';
      }
      grid.push(
        <Node
          key={i*size + j}
          sideClass={side}
          down={side ? false : true}
          right={side ? false : true}
        />);
    }
  }
  return (
    <div className="container" style={{width: props.size*50}}>
      {grid}
    </div>
  )
}


ReactDom.render(
    <Grid 
      size={5}
    />,
    document.getElementById('root')
);
