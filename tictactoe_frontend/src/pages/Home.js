import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Storage } from '../utils/storage';

const DEFAULTS = {
  p1: 'Player 1',
  p2: 'Player 2',
  symbol: 'X',
  mode: 'ai', // 'ai' or 'local'
  difficulty: 'medium'
};

// PUBLIC_INTERFACE
export default function Home() {
  const nav = useNavigate();
  const [settings, setSettings] = useState(() => ({
    ...DEFAULTS,
    ...(Storage.get('ttt:settings') || {})
  }));

  useEffect(() => {
    Storage.set('ttt:settings', settings);
  }, [settings]);

  const goPlay = (overrides = {}) => {
    const next = { ...settings, ...overrides };
    Storage.set('ttt:settings', next);
    nav('/game');
  };

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="home-hero">
        <h1>Play TicTacToe</h1>
        <p>Singleplayer vs AI or Local Multiplayer. Smooth, modern, and responsive.</p>
      </div>

      <div className="controls-grid">
        <div className="controls">
          <div className="field">
            <label className="label" htmlFor="p1">Player 1 name</label>
            <input id="p1" className="input" value={settings.p1} onChange={e=>setSettings(s=>({...s, p1: e.target.value}))} />
          </div>
          <div className="field">
            <label className="label" htmlFor="symbol">Player 1 plays</label>
            <select id="symbol" className="select" value={settings.symbol} onChange={e=>setSettings(s=>({...s, symbol: e.target.value}))}>
              <option value="X">X (first)</option>
              <option value="O">O (second)</option>
            </select>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={()=>goPlay({ mode: 'ai' })}>Play vs AI</button>
            <button className="btn btn-secondary" onClick={()=>goPlay({ mode: 'local' })}>Local Multiplayer</button>
          </div>
        </div>

        <div className="controls">
          <div className="field">
            <label className="label" htmlFor="p2">Player 2 name</label>
            <input id="p2" className="input" value={settings.p2} onChange={e=>setSettings(s=>({...s, p2: e.target.value}))} />
          </div>
          <div className="field">
            <label className="label" htmlFor="mode">Game mode</label>
            <select id="mode" className="select" value={settings.mode} onChange={e=>setSettings(s=>({...s, mode: e.target.value}))}>
              <option value="ai">Singleplayer vs AI</option>
              <option value="local">Local Multiplayer</option>
            </select>
          </div>
          <div className="row">
            <button className="btn btn-ghost" onClick={()=>setSettings(DEFAULTS)}>Reset defaults</button>
          </div>
        </div>

        <div className="controls">
          <div className="field">
            <label className="label" htmlFor="difficulty">AI difficulty</label>
            <select id="difficulty" className="select" value={settings.difficulty} onChange={e=>setSettings(s=>({...s, difficulty: e.target.value}))}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="small">
            Difficulty adjusts depth and randomness for the AI. Hard searches deeper and plays optimally.
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={()=>goPlay()}>Start Game</button>
          </div>
        </div>
      </div>
    </div>
  );
}
