const state = {
  isAuthenticated: localStorage.getItem('isLoggedIn') || false
}

export function isLoggedIn () {
  return state.isAuthenticated
}

export function logIn ({email, password}, done) {
  state.isAuthenticated = true
  localStorage.setItem('isLoggedIn', true)

  return done(null, true)
}

export function logOut () {
  state.isAuthenticated = false
  localStorage.clear()
}
