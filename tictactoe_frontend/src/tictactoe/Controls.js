import React from 'react';

/**
 * Controls for game options and restart.
 * Props:
 * - options: { p1, p2, symbol, mode, difficulty }
 * - onChange: (opts) => void
 * - onRestart: () => void
 */

// PUBLIC_INTERFACE
export default function Controls({ options, onChange, onRestart }) {
  return (
    <div className="controls">
      <div className="controls-grid">
        <div className="field">
          <label className="label" htmlFor="p1">Player 1</label>
          <input id="p1" className="input" value={options.p1} onChange={e=>onChange({...options, p1: e.target.value})} />
        </div>
        <div className="field">
          <label className="label" htmlFor="p2">Player 2</label>
          <input id="p2" className="input" value={options.p2} onChange={e=>onChange({...options, p2: e.target.value})} />
        </div>
        <div className="field">
          <label className="label" htmlFor="symbol">P1 plays</label>
          <select id="symbol" className="select" value={options.symbol} onChange={e=>onChange({...options, symbol: e.target.value})}>
            <option value="X">X (first)</option>
            <option value="O">O (second)</option>
          </select>
        </div>
        <div className="field">
          <label className="label" htmlFor="mode">Mode</label>
          <select id="mode" className="select" value={options.mode} onChange={e=>onChange({...options, mode: e.target.value})}>
            <option value="ai">Singleplayer vs AI</option>
            <option value="local">Local Multiplayer</option>
          </select>
        </div>
        <div className="field">
          <label className="label" htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" className="select" value={options.difficulty} onChange={e=>onChange({...options, difficulty: e.target.value})}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="row" style={{ alignItems: 'end', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
}
