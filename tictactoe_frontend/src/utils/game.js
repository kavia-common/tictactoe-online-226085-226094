/**
 * Core TicTacToe game utilities.
 */

export const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  for (const [a,b,c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

// PUBLIC_INTERFACE
export function nextPlayer(squares, xStarts = true) {
  const xCount = squares.filter(v => v === "X").length;
  const oCount = squares.filter(v => v === "O").length;
  if (xCount === oCount) return xStarts ? "X" : "O";
  return xCount < oCount ? "X" : "O";
}
