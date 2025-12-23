/**
 * Utilities for safe localStorage access with JSON serialization.
 * PUBLIC_INTERFACE
 */
export const Storage = {
  /** Get JSON value from localStorage with fallback. PUBLIC_INTERFACE */
  get(key, fallback = null) {
    try {
      const val = window.localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },
  /** Set JSON value into localStorage. PUBLIC_INTERFACE */
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage failures
    }
  },
  /** Remove key. PUBLIC_INTERFACE */
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
};
