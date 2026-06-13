/**
 * Auth module for the admin panel.
 * Credentials are compared against pre-computed SHA-256 hashes via the native
 * Web Crypto API — never stored as plain text.
 *
 * SHA-256("admin")    = 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
 * SHA-256("admin123") = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
 */

export const SESSION_KEY = "aepl_admin_session";

const VALID_USERNAME_HASH =
  "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918";
const VALID_PASSWORD_HASH =
  "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validates username/password against pre-computed hashes.
 * On success, writes the session key to localStorage and returns true.
 * On failure, returns false without touching localStorage.
 */
export async function login(username: string, password: string): Promise<boolean> {
  const [usernameHash, passwordHash] = await Promise.all([
    sha256(username),
    sha256(password),
  ]);

  if (usernameHash === VALID_USERNAME_HASH && passwordHash === VALID_PASSWORD_HASH) {
    localStorage.setItem(SESSION_KEY, "true");
    return true;
  }

  return false;
}

/**
 * Destroys the current session by removing the session key from localStorage.
 */
export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Returns true if a valid session exists in localStorage.
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem(SESSION_KEY) !== null;
}
