import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Necessary for adding redux toolkit
 */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

/**
 * Importing reducers
 */
import testReducer from './reducers/testReducer.js'
import hubReducer from './reducers/hubReducer.js'
import playReducer from './reducers/playReducer.js'

/**
 * Creating the store w/reducers
 */
const store = configureStore({
  reducer: {
    test: testReducer,
    quizzes: hubReducer,
    play: playReducer


  }
})

console.log('store is',store.getState());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
