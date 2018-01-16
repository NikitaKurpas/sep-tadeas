import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import i18n from '../services/i18n'

const Navbar = ({user}) => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div className='container'>
      {/*<a className='navbar-brand' href='#'>TADEAS</a>*/}
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarsExample07' aria-controls='navbarsExample07' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'/>
      </button>

      <div className='collapse navbar-collapse'>
        {/*<Route path='/tasks' exact render={() => (*/}
          {/*<ul className='navbar-nav mr-auto'>*/}
            {/*<li className='nav-item active'>*/}
              {/*<Link to='/tasks/create' className='btn btn-primary'>Create task</Link>*/}
            {/*</li>*/}
          {/*</ul>*/}
        {/*)}/>*/}
        <Route path='/task/:what' render={() => (
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link to='/' className='btn btn-primary'>{i18n('Navbar.taskList', 'Task list')}</Link>
            </li>
          </ul>
        )}/>
      </div>
      <span className='my-0 my-md-2 mr-md-2' style={{color: '#fff'}}>{user.userName}</span>
      <Link to='/logout' className='btn btn-outline-danger my-2 my-sm-0'>{i18n('Navbar.logOut', 'Log out')}</Link>
    </div>
  </nav>
)

Navbar.propTypes = {
  user: PropTypes.object.isRequired
}

export default Navbar
