import React from 'react';

/**
 * Simple modal.
 * Props:
 * - open: boolean
 * - title: string
 * - children: ReactNode
 * - actions: [{ label, onClick, variant?: 'primary'|'secondary'|'ghost'|'danger' }]
 * - onClose: () => void
 */

// PUBLIC_INTERFACE
export default function Modal({ open, title, children, actions = [], onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <header>{title}</header>
        <div>{children}</div>
        <footer>
          {actions.map((a, i) => (
            <button
              key={i}
              className={`btn ${a.variant ? `btn-${a.variant}` : ''}`}
              onClick={a.onClick}
            >
              {a.label}
            </button>
          ))}
          {!actions.length && (
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          )}
        </footer>
      </div>
    </div>
  );
}
