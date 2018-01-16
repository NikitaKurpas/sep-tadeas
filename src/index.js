import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from './reducers/PromiseMiddleware'

import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'



import combineReducer from './reducers'

// const middleware = [thunk, promiseMiddleware]

let store = createStore(
    combineReducer,
    // applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        // applyMiddleware(...thunk)
        thunk
    )
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
// registerServiceWorker()


