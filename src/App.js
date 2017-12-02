import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
import {isLoggedIn, logIn} from './services/authService'
import logo from './logo.svg'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <Route path='/login' component={Login} />
        <PrivateRoute path='/' component={Dashboard} />
        {/* <div className="App"> */}
        {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <h1 className="App-title">Welcome to React</h1> */}
        {/* </header> */}
        {/* <p className="App-intro"> */}
        {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        {/* </p> */}
        {/* </div>  */}
      </Router>
    )
  }
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props =>
    isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  } />
)

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const Dashboard = () => {}

export default App
