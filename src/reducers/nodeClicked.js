function setAction(from, to) {
  if (
    Math.abs(from.r - to.r) === 1 &&
    Math.abs(from.c - to.c) === 0
  ) {
    return {
      line: 'vertical',
      node: from.r > to.r ? to : from
    };
  } else if (
    Math.abs(from.r - to.r) === 0 &&
    Math.abs(from.c - to.c) === 1
  ) {
    return {
      line: 'horizontal',
      node: from.c > to.c ? to : from
    };
  } else {
    return {
      line: null
    };
  }
}


function isValidMove(gridState, row, col, size) {
  return (
    row >= 0 &&
    col >= 0 &&
    row < size.r - 1 &&
    col < size.c - 1 &&
    !gridState[row][col].owner
  );
}


function nodeClicked(state, clickedNode) {
  // console.log(`clicked ${clickedNode.r}, ${clickedNode.c}`);

  const lastClicked = state.lastClicked;
  if (!lastClicked ||
    state.isX !== state.xIsNext ||
    !(state.user.id === state.users.x || state.user.id === state.users.o) ||
    (clickedNode.r === lastClicked.r &&
      clickedNode.c === lastClicked.c)
  ) {
    return {
      ...state,
      ...{
        lastClicked: clickedNode
      }
    };
  }

  let gridState = [];
  state.gridNodes.forEach(row => gridState.push(row.map(node => ({...node}))));

  let gotNodes = 0; // How many nodes did they get?
  let gotNode;
  let xIsNext = state.xIsNext;
  const size = state.size;
  let score = state.score;
  const players = state.players;

  const action = setAction(state.lastClicked, clickedNode);
  if (
    !action.line ||
    (gridState[action.node.r][action.node.c].down && action.line === 'vertical') ||
    (gridState[action.node.r][action.node.c].right && action.line === 'horizontal')
  ) {
    return {
      ...state,
      ...{
        lastClicked: clickedNode
      }
    };
  }

  const row = action.node.r;
  const col = action.node.c;

  if (action.line === 'vertical') {
    gridState[row][col].down = true;
    [gridState, gotNode] = updateOwner(gridState, xIsNext, row, col - 1, size, players);
  } else if (action.line === 'horizontal') {
    gridState[row][col].right = true;
    [gridState, gotNode] = updateOwner(gridState, xIsNext, row - 1, col, size, players);
  }
  gotNodes += gotNode;

  [gridState, gotNode] = updateOwner(gridState, xIsNext, row, col, size, players);
  gotNodes += gotNode;


  xIsNext = (gotNodes ? xIsNext : !xIsNext);
  score = {
    x: (xIsNext ? score.x + gotNodes : score.x),
    o: (xIsNext ? score.o : score.o + gotNodes),
  };
  let gameStatus;
  let status;
  let offline = state.offline;

  if ( score.x + score.o === (size.r-1)*(size.c-1)) {
    status = 'finished';
    offline = false;
    if ( score.x === score.o ) {
      gameStatus = 'Draw!';
    } else {
      gameStatus = `${score.x > score.o ? players.x : players.o} won by ${Math.abs(score.x - score.o)} point(s)`;
    }
  } else {
    gameStatus = `${xIsNext ? players.x : players.o} to move`;
    status = 'started';
  }


  let newState =  {
    ...state,
    ...{
      lastClicked: action.line ? null : state.lastClicked,
      xIsNext: xIsNext,
      gameStatus: gameStatus,
      gridNodes: gridState,
      score: score,
      step: state.step+1,
      status: status,
      lastMoved: action.line ? action : null,
      offline: offline,
    }
  };

  if (!gotNodes || !offline) return newState;

  newState = getNeighbour(newState, row, col);
  
  if (action.line === 'vertical') {
    newState = getNeighbour(newState, row, col-1);
  }
  
  if (action.line === 'horizontal') {
    newState = getNeighbour(newState, row-1, col);
  }

  return newState;
}


function getNeighbour(state, row, col) {
  const gridState = state.gridNodes;
  const size = state.size;
  if (
    !isValidMove(gridState, row, col, size) ||
    (gridState[row][col].right +
    gridState[row][col].down +
    gridState[row + 1][col].right +
    gridState[row][col + 1].down) !== 3
  ) {
    return state;
  }
  if (!gridState[row][col].right) {
    state = nodeClicked(state, {r: row, c: col})
    return nodeClicked(state, {r: row, c: col+1})
  }
  if (!gridState[row][col].down) {
    state = nodeClicked(state, {r: row, c: col})
    return nodeClicked(state, {r: row+1, c: col})
  }
  if (!gridState[row + 1][col].right) {
    state = nodeClicked(state, {r: row+1, c: col})
    return nodeClicked(state, {r: row+1, c: col+1})
  }
  if (!gridState[row][col + 1].down) {
    state = nodeClicked(state, {r: row, c: col+1})
    return nodeClicked(state, {r: row+1, c: col+1})
  }
}


function updateOwner(gridState, xIsNext, row, col, size, players) {
  let gotNode = false;
  if (
    isValidMove(gridState, row, col, size) &&
    gridState[row][col].right &&
    gridState[row][col].down &&
    gridState[row + 1][col].right &&
    gridState[row][col + 1].down
  ) {
    gridState[row][col].owner = xIsNext ? players.x[0] : players.o[0];
    gotNode = true;
  }

  return [gridState, gotNode];
}

export default nodeClicked;
