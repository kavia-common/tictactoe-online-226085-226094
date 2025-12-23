/**
 * Minimax with alpha-beta pruning for TicTacToe.
 * Supports difficulty levels by limiting search depth or injecting randomness.
 */

const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diags
];

function winner(board) {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function availableMoves(board) {
  const out = [];
  for (let i=0;i<9;i++) if (!board[i]) out.push(i);
  return out;
}

function isTerminal(board) {
  return winner(board) || availableMoves(board).length === 0;
}

function score(board, ai, depth) {
  const w = winner(board);
  if (w === ai) return 10 - depth;
  if (w && w !== ai) return depth - 10;
  return 0;
}

function minimax(board, ai, player, depth, maxDepth, alpha, beta) {
  if (isTerminal(board) || depth === maxDepth) {
    return { score: score(board, ai, depth), move: null };
    }
  const moves = availableMoves(board);

  if (player === ai) {
    let best = { score: -Infinity, move: moves[0] ?? null };
    for (const mv of moves) {
      board[mv] = player;
      const result = minimax(board, ai, ai === "X" ? "O" : "X", depth + 1, maxDepth, alpha, beta);
      board[mv] = null;
      if (result.score > best.score) best = { score: result.score, move: mv };
      alpha = Math.max(alpha, best.score);
      if (beta <= alpha) break; // prune
    }
    return best;
  } else {
    let best = { score: Infinity, move: moves[0] ?? null };
    for (const mv of moves) {
      board[mv] = player;
      const result = minimax(board, ai, ai === "X" ? "O" : "X", depth + 1, maxDepth, alpha, beta);
      board[mv] = null;
      if (result.score < best.score) best = { score: result.score, move: mv };
      beta = Math.min(beta, best.score);
      if (beta <= alpha) break; // prune
    }
    return best;
  }
}

// PUBLIC_INTERFACE
export function computeBestMove(board, aiSymbol = "O", difficulty = "medium") {
  // Difficulty depth caps: easy=1-2, medium=3-5, hard=8 (full search)
  const caps = { easy: 2, medium: 5, hard: 8 };
  const maxDepth = caps[difficulty] ?? 5;

  // Randomness injection for easy/medium when multiple best moves
  const empty = availableMoves(board);
  if (difficulty === "easy" && Math.random() < 0.35) {
    return empty[Math.floor(Math.random() * empty.length)] ?? null;
  }
  if (difficulty === "medium" && Math.random() < 0.15) {
    return empty[Math.floor(Math.random() * empty.length)] ?? null;
  }

  const { move } = minimax([...board], aiSymbol, aiSymbol, 0, maxDepth, -Infinity, Infinity);
  return move;
}
