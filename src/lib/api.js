// In dev, Vite proxies /api to the backend (see vite.config.js).
// For a deployed site set VITE_API_URL, e.g. https://api.yoursite.com
const BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export async function api(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Cannot reach the server. Please try again.");
  }
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.details?.[0]?.message ?? body?.error ?? `Request failed (${res.status})`);
  return body;
}
