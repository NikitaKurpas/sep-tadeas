export function isLoggedIn () {
  return localStorage.getItem('isLoggedIn') || false
}

export function logIn ({email, password}, done) {
  localStorage.setItem('isLoggedIn', true)
  localStorage.setItem('email', email)

  return done(null, true)
}

export function logOut () {
  localStorage.clear()
}
export function getUsername () {
  return localStorage.getItem('email') || 'Unknown User'
}

export function getToken () {
  return localStorage.getItem('token') || ''
}
