import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { logIn } from '../services/authService'
import './LogIn.css'
import { Button } from 'react-bootstrap'
import i18n from '../services/i18n'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/actions'

class LogIn extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("nove props: ", nextProps)
  //   if (nextProps.isLogedIn) {
  //     this.setState({
  //       redirectToReferrer: true
  //     })
  //   }
  // }

  handleInputChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name


    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    const { actions } = this.props
    event.preventDefault()
    var username = this.state.username;
    var password = this.state.password;
    actions.logInUser(username, password)
    this.setState({ redirectToReferrer: true })
  }

  render() {
    const { from } = this.props.ownProps.location.state || { from: { pathname: '/' } }
    const { isLogedIn, ownProps } = this.props
    const { redirectToReferrer } = this.state


    // if (isLogedIn) {
    //   this.props.history.push(from)
    // }

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    //TODO in next version
    var loginFail = false

    return (
      <div className='LogIn' >
        <div className='container'>
          <form className='LogIn-form' onSubmit={this.handleSubmit}>
            <h2 className='LogIn-form-heading'>{i18n('LogIn.heading', 'Please sign in')}</h2>
            {/* Email */}
            <label htmlFor='username' className='sr-only'>{i18n('LogIn.username', 'Username')}</label>
            <input type='username'
              id='username'
              name='username'
              className='form-control'
              placeholder={i18n('LogIn.username', 'Username')}
              required
              autoFocus
              value={this.state.username}
              onChange={this.handleInputChange} />
            {/* Password */}
            <label htmlFor='password' className='sr-only'>{i18n('LogIn.password', 'Password')}</label>
            <input type='password'
              id='password'
              name='password'
              className='form-control'
              placeholder={i18n('LogIn.password', 'Password')}
              required
              value={this.state.password}
              onChange={this.handleInputChange} />

            <button className='btn btn-lg btn-primary btn-block'
              type='submit'>{i18n('LogIn.signIn', 'Sign in')}</button>
            <Button className='btn btn-lg btn-primary btn-block'
              disabled={!loginFail}>{i18n('LogIn.resetPassword', 'Reset password')}</Button>
          </form>
        </div>
      </div>
    )
  }
}

LogIn.propTypes = {
  location: PropTypes.object.isRequired
}

// const mapDispatchToProps = {
//   logInUser
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.reducer,
    ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
