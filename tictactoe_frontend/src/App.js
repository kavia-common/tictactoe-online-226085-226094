import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './theme.css';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import About from './pages/About';

// PUBLIC_INTERFACE
function App() {
  /** App shell with header/nav, routes, and footer. */
  return (
    <div className="app-shell">
      <BrowserRouter>
        <header className="header">
          <div className="header-inner">
            <div className="brand">
              <div className="brand-logo" aria-hidden="true" />
              <div>
                <div className="brand-title">TicTacToe</div>
                <div className="brand-sub">Ocean Professional</div>
              </div>
            </div>
            <nav className="nav" aria-label="Primary">
              <NavLink to="/" end className={({isActive}) => isActive ? 'active' : undefined}>Home</NavLink>
              <NavLink to="/game" className={({isActive}) => isActive ? 'active' : undefined}>Play</NavLink>
              <NavLink to="/about" className={({isActive}) => isActive ? 'active' : undefined}>About</NavLink>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} TicTacToe · Built with React · No backend required
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
