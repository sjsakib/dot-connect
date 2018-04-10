const size = 7;
const initialState = {
  size: size,
  lastClicked: null,
  xIsNext: true, // Let's call the first player X
  gridNodes: Array(size)
    .fill()
    .map(() =>
      Array(size)
      .fill()
      .map(() => ({
        right: false,
        down: false,
        owner: null
      }))
    )
};


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
    row < size - 1 &&
    col < size - 1 &&
    !gridState[row][col].owner
  );
}


function nodeClicked(state, clickedNode) {
  console.log(`clicked ${clickedNode.r}, ${clickedNode.c}`);

  const lastClicked = state.lastClicked;
  if (!lastClicked ||
    (clickedNode.r == lastClicked.r &&
      clickedNode.c == lastClicked.c)
  ) {
    return {
      lastClicked: clickedNode
    };
  }

  const action = setAction(state.lastClicked, clickedNode);
  console.log(action.line);
  if (!action.line) {
    return {
      lastClicked: clickedNode
    };
  }

  let gridState = state.gridNodes.slice();
  let gotNode = false;
  let gotNode2; // This is ugly, couldn't think anything else
  const row = action.node.r;
  const col = action.node.c;
  const size = state.size;
  const xIsNext = state.xIsNext;

  if (action.line === 'vertical') {
    gridState[row][col].down = true;
    [gridState, gotNode2] = updateOwner(gridState, xIsNext, row, col - 1, size);
  } else if (action.line === 'horizontal') {
    gridState[row][col].right = true;
    [gridState, gotNode2] = updateOwner(gridState, xIsNext, row - 1, col, size);
  }
  gotNode = gotNode || gotNode2;

  [gridState, gotNode2] = updateOwner(gridState, xIsNext, row, col, size);
  gotNode = gotNode || gotNode2;

  console.log(gridState);

  return {
    lastClicked: action.line ? null : state.lastClicked,
    xIsNext: gotNode ? state.xIsNext : !state.xIsNext,
    gridNodes: gridState
  }
}


function updateOwner(gridState, xIsNext, row, col, size) {
  let gotNode = false;
  if (
    isValidMove(gridState, row, col, size) &&
    gridState[row][col].right &&
    gridState[row][col].down &&
    gridState[row + 1][col].right &&
    gridState[row][col + 1].down
  ) {
    gridState[row][col].owner = xIsNext ? 'X' : 'O';
    gotNode = true;
  }

  return [gridState, gotNode];
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'NODE_CLICKED':
      return {...state, ...nodeClicked(state, action.node)};
    default:
      return state;
  }
}