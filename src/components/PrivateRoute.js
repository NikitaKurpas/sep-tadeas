import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isLoggedIn} from '../services/authService';

const PrivateRoute = ({component: Component, render, ...rest}) => (
  <Route {...rest} render={props =>
    isLoggedIn() ? (
      render !== undefined ? render(props) : <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
    )
  }/>
)

export default PrivateRoute
