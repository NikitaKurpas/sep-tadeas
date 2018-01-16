import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { isLoggedIn, logOut, getUser } from './services/authService'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar.js'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import './App.css'
import { connect } from 'react-redux'
// import logo from './logo.svg'

class App extends Component {
  render() {
    // let user = void 0;
    // if (isLoggedIn()) {
    //   user = getUser()
    // }
    const { isLogedIn, user } = this.props;
    console.log("route islogedin", isLogedIn)
    return (
      <Router>
        <div>
          <Route path='/' exact render={() => <Redirect to='/task' />} />
          <Route path='/login' render={props => isLogedIn ? <Redirect to='/task' /> : <LogIn {...props} />} />
          <Route path='/logout' render={() => {
            logOut();
            return <Redirect to='/login' />
          }} />
          <PrivateRoute path='/task' component={Navbar} isAuthenticated={isLogedIn} />
          <PrivateRoute path='/task' exact component={Dashboard} isAuthenticated={isLogedIn} />
          <PrivateRoute path='/task/:id' exact component={TaskDetail} isAuthenticated={isLogedIn} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.reducer,
    ownProps
  }
}

export default connect(mapStateToProps)(App)
