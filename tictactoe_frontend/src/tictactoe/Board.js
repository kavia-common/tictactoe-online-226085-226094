import React from 'react';
import Square from './Square';

/**
 * Renders the 3x3 board grid.
 * Props:
 * - squares: Array(9) of 'X'|'O'|null
 * - current: 'X'|'O'
 * - onClick: (index) => void
 */

// PUBLIC_INTERFACE
export default function Board({ squares, current, onClick }) {
  return (
    <div className="board" role="grid" aria-label="TicTacToe board">
      {squares.map((val, idx) => (
        <Square
          key={idx}
          value={val}
          ariaLabel={`Cell ${idx + 1}`}
          onClick={() => onClick(idx)}
          isO={val === 'O'}
          disabled={!!val}
          highlight={false}
          current={current}
        />
      ))}
    </div>
  );
}
