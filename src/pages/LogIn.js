import React from 'react'
import { Redirect } from 'react-router-dom'
import { logIn } from '../services/authService'
import './LogIn.css'

class LogIn extends React.Component {
  state = {
    redirectToReferrer: false
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(Object.assign({}, this.state, {
      [name]: value
    }))
  }

  handleSubmit = event => {
    event.preventDefault()
    logIn({email: this.state.email, password: this.state.password}, () => {
      this.setState({redirectToReferrer: true})
    })
  }

  render () {
    const {from} = this.props.location.state || {from: {pathname: '/'}}
    const {redirectToReferrer} = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div className='LogIn'>
        <div className='container'>
          <form className='LogIn-form' onSubmit={this.handleSubmit}>
            <h2 className='LogIn-form-heading'>Please sign in</h2>
            {/* Email */}
            <label htmlFor='email' className='sr-only'>Email address</label>
            <input type='email'
                   id='email'
                   name='email'
                   className='form-control'
                   placeholder='Email address'
                   required
                   autoFocus
                   value={this.state.email}
                   onChange={this.handleInputChange}/>
            {/* Password */}
            <label htmlFor='password' className='sr-only'>Password</label>
            <input type='password'
                   id='password'
                   className='form-control'
                   placeholder='Password'
                   required
                   value={this.state.password}
                   onChange={this.handleInputChange}/>

            {/*<div className='checkbox'>*/}
              {/*<label>*/}
                {/*<input type='checkbox' value='remember-me'> Remember me </input>*/}
              {/*</label>*/}
            {/*</div>*/}
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LogIn;
