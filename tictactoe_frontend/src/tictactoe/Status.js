import React from 'react';

/**
 * Status header above the board.
 * Props:
 * - names: { X: string, O: string }
 * - mode: 'ai'|'local'
 */

// PUBLIC_INTERFACE
export default function Status({ names, mode }) {
  return (
    <div className="status-bar">
      <div className="status-text">
        Ready to play
      </div>
      <div className="center">
        <span className="badge">{mode === 'ai' ? 'Singleplayer' : 'Local Multiplayer'}</span>
      </div>
      <div className="status-meta">
        X: <strong>{names.X}</strong> · O: <strong>{names.O}</strong>
      </div>
    </div>
  );
}
