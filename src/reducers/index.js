const size = {
  r: 7,
  c: 5,
};
const initialState = {
  size: size,
  lastClicked: null,
  xIsNext: true, // Let's call the first player X
  score: {
    x: 0,
    o: 0,
  },
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
  console.log(`clicked ${clickedNode.r}, ${clickedNode.c}`);

  const lastClicked = state.lastClicked;
  if (!lastClicked ||
    (clickedNode.r === lastClicked.r &&
      clickedNode.c === lastClicked.c)
  ) {
    return {
      lastClicked: clickedNode
    };
  }

  let gridState = state.gridNodes.slice();
  let gotNodes = 0; // How many nodes did they get?
  let gotNode;
  const size = state.size;
  const xIsNext = state.xIsNext;
  const score = state.score;

  const action = setAction(state.lastClicked, clickedNode);
  if (
    !action.line ||
    (gridState[action.node.r][action.node.c].down && action.line === 'vertical') ||
    (gridState[action.node.r][action.node.c].right && action.line === 'horizontal')
  ) {
    return {
      lastClicked: clickedNode
    };
  }

  const row = action.node.r;
  const col = action.node.c;

  if (action.line === 'vertical') {
    gridState[row][col].down = true;
    [gridState, gotNode] = updateOwner(gridState, xIsNext, row, col - 1, size);
  } else if (action.line === 'horizontal') {
    gridState[row][col].right = true;
    [gridState, gotNode] = updateOwner(gridState, xIsNext, row - 1, col, size);
  }
  gotNodes += gotNode;

  [gridState, gotNode] = updateOwner(gridState, xIsNext, row, col, size);
  gotNodes += gotNode;

  return {
    lastClicked: action.line ? null : state.lastClicked,
    xIsNext: gotNode ? xIsNext : !xIsNext,
    gridNodes: gridState,
    score: {
      x: (xIsNext ? score.x + gotNodes : score.x),
      o: (xIsNext ? score.o : score.o + gotNodes),
    }
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