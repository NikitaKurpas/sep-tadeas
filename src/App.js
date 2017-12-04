import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { isLoggedIn, logOut, getUsername } from './services/authService'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import './App.css'
import logo from './logo.svg'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/' exact render={() => <Redirect to='/tasks'/>} />
          <Route path='/login' render={props => isLoggedIn() ? <Redirect to='/tasks'/> : <LogIn {...props}/>}/>
          <Route path='/logout' render={() => {
            logOut();
            return <Redirect to='/login'/>
          }}/>
          <PrivateRoute path='/tasks' render={props => (
            <Navbar username={getUsername()} {...props}/>
          )}/>
          <PrivateRoute path='/tasks' exact component={Dashboard}/>
          <PrivateRoute path='/tasks/:id' exact component={TaskDetail}/>
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
