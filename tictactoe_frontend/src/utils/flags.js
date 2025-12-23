/**
 * Feature flag utilities sourced from REACT_APP_FEATURE_FLAGS env var (JSON or CSV).
 * Defaults to disabled features when env is missing or malformed.
 */

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  const raw = process.env.REACT_APP_FEATURE_FLAGS || "";
  const flags = {};
  try {
    if (raw.trim().startsWith("{")) {
      Object.assign(flags, JSON.parse(raw));
    } else if (raw.includes(",")) {
      raw.split(",").map(s => s.trim()).filter(Boolean).forEach(k => flags[k] = true);
    } else if (raw.trim()) {
      flags[raw.trim()] = true;
    }
  } catch {
    // ignore parsing errors; use empty flags
  }
  return flags;
}

// PUBLIC_INTERFACE
export function isEnabled(flagName, fallback = false) {
  const flags = getFeatureFlags();
  return flags[flagName] ?? fallback;
}
