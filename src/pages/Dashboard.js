import React, { Component } from 'react'
import Navbar from '../components/Navbar'

class Dashboard extends Component {
  render() {
    return <Navbar username='Username' buttons={[{label: 'Create Task', link: '/tasks/create'}]}/>
  }
}

export default Dashboard
