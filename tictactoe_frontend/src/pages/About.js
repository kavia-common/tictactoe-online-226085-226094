import React from 'react';

// PUBLIC_INTERFACE
export default function About() {
  return (
    <div className="card" style={{ padding: 18 }}>
      <h2>About</h2>
      <p>
        This is a lightweight, modern TicTacToe game built with React.
        It supports singleplayer vs. AI using minimax with alpha-beta pruning and difficulty levels,
        and local pass-and-play multiplayer. There is no backend dependency.
      </p>
      <p className="small">
        Theme: Ocean Professional • Blue and amber accents • Subtle shadows • Smooth transitions.
      </p>
    </div>
  );
}
