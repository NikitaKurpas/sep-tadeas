import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
// import logo from './logo.svg'
// import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import {Col, Row} from 'antd';
import LogIn from 'pages/LogIn'
import Dashboard from 'pages/Dashboard'
import PrivateRoute from 'components/PrivateRoute'

class App extends Component {
  render () {
    return (
      <Router>
        <Route path='/login' component={LogIn} />
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

export default App
