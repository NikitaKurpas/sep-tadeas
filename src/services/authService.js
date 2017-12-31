import api from './api'

export function isLoggedIn () {
  return !!localStorage.getItem('user') || false
}

export function logIn ({username, password}, done) {
  api(`/user/login?username=${username}&password=${password}`)
    .then(body => {
      localStorage.setItem('sessionId', body.sessionId)
      localStorage.setItem('user', JSON.stringify(body));

      return done(null, body)
    })
    .catch(err => alert(err.message))
}

export function logOut () {
  localStorage.clear()
}

export function getSessionId () {
  return localStorage.getItem('sessionId') || ''
}

export function getUser () {
  return !!localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')) || void 0
}
