import React from 'react'

const Navbar = ({username, buttons}) => (
  <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
    <div className='container'>
      {/*<a className='navbar-brand' href='#'>TADEAS</a>*/}
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarsExample07' aria-controls='navbarsExample07' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'/>
      </button>

      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          {(buttons || []).map(button => (
            <li className='nav-item active'>
              <a className='nav-link' href={button.link}>{button.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <span className='my-0 my-md-2' style={{color: '#fff'}}>{username}</span>
    </div>
  </nav>
)

export default Navbar
