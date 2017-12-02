const state = {
  isAuthenticated: false
}

export function isLoggedIn () {
  return state.isAuthenticated
}

export function logIn ({username, password}, done) {
  state.isAuthenticated = true



  return done(null, true)
}
