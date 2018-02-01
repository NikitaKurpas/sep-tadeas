export function isLoggedIn() {
  return !!localStorage.getItem('tadeas-user') || false
}

export function logOut() {
  localStorage.clear()
}

export function getSessionId() {
  return localStorage.getItem('tadeas-session-id') || ''
}
