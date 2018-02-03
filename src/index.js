import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import '../node_modules/toastr/build/toastr.min.css';
import App from './App'
import configureStore from './store/configureStore';

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)