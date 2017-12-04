import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import LogIn from './pages/LogIn'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { isLoggedIn } from './services/authService'
import Task from './pages/TaskDetail'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/login' render={props => isLoggedIn() ? <Redirect to='/'/> : <LogIn {...props}/>}/>
          <PrivateRoute path='/' exact component={Dashboard}/>
          <PrivateRoute path='/tasks/:id' componen={Task}/>
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
