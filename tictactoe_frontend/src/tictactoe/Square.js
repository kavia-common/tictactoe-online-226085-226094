import React from 'react';

/**
 * Renders a single square.
 * Props:
 * - value: 'X'|'O'|null
 * - onClick: () => void
 * - disabled: boolean
 * - isO: boolean
 * - ariaLabel: string
 * - highlight: boolean
 * - current: 'X'|'O'
 */

// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, isO, ariaLabel }) {
  return (
    <button
      type="button"
      className={`square ${disabled ? 'disabled' : ''} ${isO ? 'o' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {value || ''}
    </button>
  );
}
