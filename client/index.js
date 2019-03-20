import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'

// hack to work around spotify web player SDK
// the script tag on index.html calls this function automatically when it loads
window.onSpotifyWebPlaybackSDKReady = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
    document.getElementById('app')
  )
}
