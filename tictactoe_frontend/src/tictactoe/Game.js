import React, { useEffect, useMemo, useState } from 'react';
import Board from './Board';
import { calculateWinner, isDraw, nextPlayer } from '../utils/game';
import { computeBestMove } from '../utils/ai';

/**
 * Game container orchestrates moves, AI, and end-of-game detection.
 * Props:
 * - options: { mode: 'ai'|'local', difficulty: 'easy'|'medium'|'hard', symbol: 'X'|'O', p1, p2 }
 * - names: { X: string, O: string }
 * - onGameEnd: (result: { type: 'win'|'draw', symbol?: 'X'|'O' }) => void
 */

// PUBLIC_INTERFACE
export default function Game({ options, names, onGameEnd }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xStarts] = useState(options.symbol === 'X');
  const current = useMemo(() => nextPlayer(squares, xStarts), [squares, xStarts]);
  const over = useMemo(() => !!calculateWinner(squares) || isDraw(squares), [squares]);

  // Detect game end and notify parent
  useEffect(() => {
    const win = calculateWinner(squares);
    if (win) {
      onGameEnd?.({ type: 'win', symbol: win.winner });
    } else if (isDraw(squares)) {
      onGameEnd?.({ type: 'draw' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  // AI move when applicable
  useEffect(() => {
    if (over) return;
    if (options.mode !== 'ai') return;
    const aiSymbol = options.symbol === 'X' ? 'O' : 'X';
    if (current !== aiSymbol) return;

    const t = setTimeout(() => {
      const move = computeBestMove(squares, aiSymbol, options.difficulty);
      if (move != null && squares[move] == null) {
        setSquares(prev => {
          if (prev[move] != null) return prev;
          const next = [...prev];
          next[move] = aiSymbol;
          return next;
        });
      }
    }, 350); // slight delay for UX

    return () => clearTimeout(t);
  }, [current, options, over, squares]);

  const handleMove = (idx) => {
    if (over) return;
    if (squares[idx] != null) return;

    if (options.mode === 'ai') {
      const human = options.symbol;
      if (current !== human) return;
      setSquares(prev => {
        const next = [...prev];
        next[idx] = human;
        return next;
      });
    } else {
      // Local pass-and-play
      setSquares(prev => {
        const next = [...prev];
        next[idx] = current;
        return next;
      });
    }
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <Board squares={squares} onClick={handleMove} current={current} />
      <div className="small center" style={{ marginTop: 10 }}>
        Turn: <strong>{names[current]} ({current})</strong>
      </div>
    </div>
  );
}
