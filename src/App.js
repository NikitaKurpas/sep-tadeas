import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { isLoggedIn, logOut, getUser } from './services/authService'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import './App.css'
// import logo from './logo.svg'

class App extends Component {
  render () {
    let user = void 0;
    if (isLoggedIn()) {
      user = getUser()
    }
    return (
      <Router>
        <div>
          <Route path='/' exact render={() => <Redirect to='/task'/>} />
          <Route path='/login' render={props => isLoggedIn() ? <Redirect to='/task'/> : <LogIn {...props}/>}/>
          <Route path='/logout' render={() => {
            logOut();
            return <Redirect to='/login'/>
          }}/>
          <PrivateRoute path='/task' render={props => (
            <Navbar user={user} {...props}/>
          )}/>
          <PrivateRoute path='/task' exact render={props => (
            <Dashboard user={user} {...props}/>
          )}/>
          <PrivateRoute path='/task/:id' exact render={props => (
            <TaskDetail user={user} {...props}/>
          )}/>
        </div>
        {/* <div className='App'> */}
        {/* <header className='App-header'> */}
        {/* <img src={logo} className='App-logo' alt='logo' /> */}
        {/* <h1 className='App-title'>Welcome to React</h1> */}
        {/* </header> */}
        {/* <p className='App-intro'> */}
        {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        {/* </p> */}
        {/* </div>  */}
      </Router>
    )
  }
}

export default App
