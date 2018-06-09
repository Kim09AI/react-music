import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { callAPIMiddleware } from './utils/reactUtil'
import reducers from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import './styles/index.styl'

FastClick.attach(document.body)

const middleware = [callAPIMiddleware]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducers, applyMiddleware(...middleware)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

registerServiceWorker()
