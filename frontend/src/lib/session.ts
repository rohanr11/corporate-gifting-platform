// Generates (and persists) an anonymous session ID in localStorage.
// This stands in for real authentication — good enough to give each
// visitor their own cart/wishlist without building a login system.
const KEY = "gg_session_id";

export function getSessionId(): string {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
