import React, { useEffect, useMemo, useState } from 'react';
import Game from '../tictactoe/Game';
import Controls from '../tictactoe/Controls';
import Status from '../tictactoe/Status';
import Modal from '../tictactoe/Modal';
import { Storage } from '../utils/storage';

// PUBLIC_INTERFACE
export default function GamePage() {
  const saved = Storage.get('ttt:settings') || {};
  const [options, setOptions] = useState({
    p1: saved.p1 || 'Player 1',
    p2: saved.p2 || 'Player 2',
    symbol: saved.symbol || 'X',
    mode: saved.mode || 'ai',
    difficulty: saved.difficulty || 'medium'
  });
  useEffect(() => { Storage.set('ttt:settings', options); }, [options]);

  const [key, setKey] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const restart = () => {
    setKey(k => k + 1);
  };

  const onGameEnd = (result) => {
    setLastResult(result);
  };

  const names = useMemo(() => ({
    X: options.symbol === 'X' ? options.p1 : options.p2,
    O: options.symbol === 'O' ? options.p1 : options.p2
  }), [options]);

  return (
    <div className="game-shell">
      <Status
        key={'status-' + key}
        names={names}
        mode={options.mode}
      />
      <Game
        key={'game-' + key}
        options={options}
        names={names}
        onGameEnd={onGameEnd}
      />
      <Controls
        options={options}
        onChange={setOptions}
        onRestart={restart}
      />
      <Modal
        open={!!lastResult}
        onClose={() => setLastResult(null)}
        title={lastResult?.type === 'win' ? 'We have a winner!' : 'It’s a draw!'}
        actions={[
          { label: 'Play again', variant: 'primary', onClick: () => { setLastResult(null); restart(); } },
          { label: 'Close', variant: 'ghost', onClick: () => setLastResult(null) }
        ]}
      >
        {lastResult?.type === 'win' ? (
          <div className="center">
            <div className="badge">Winner</div>
            <h3 style={{ marginTop: 8 }}>{names[lastResult.symbol]} ({lastResult.symbol})</h3>
          </div>
        ) : (
          <div className="center">
            <div className="badge">No winner</div>
            <h3 style={{ marginTop: 8 }}>Great game! Try again?</h3>
          </div>
        )}
      </Modal>
    </div>
  );
}
