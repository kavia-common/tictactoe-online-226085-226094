# TicTacToe – Ocean Professional

A modern, responsive TicTacToe app built with React. Supports:
- Singleplayer vs AI (minimax with pruning, difficulty levels)
- Local pass-and-play multiplayer
- Persisted settings (names, symbol, difficulty)
- No backend dependency

## Quick Start

- npm install
- npm start
- Open http://localhost:3000

## Environment / Feature Flags

This app is frontend-only and safely ignores backend URLs.
- REACT_APP_FEATURE_FLAGS: JSON or CSV of enabled flags. Example:
  - CSV: REACT_APP_FEATURE_FLAGS="beta-mode,new-ui"
  - JSON: REACT_APP_FEATURE_FLAGS="{\"beta-mode\":true}"

All flags default to disabled when not provided.

## Routes
- / – Home
- /game – Game
- /about – About

## Theme
Ocean Professional with blue and amber accents, subtle shadows, rounded corners, and smooth transitions.
