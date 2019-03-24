import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import channel from './channel'
import player from './player'
import song from './song'
import currentTrack from './currentTrack'
import message from './message'
const reducer = combineReducers({
  user,
  channel,
  player,
  song,
  currentTrack,
  message
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './channel'
export * from './player'
export * from './song'
export * from './message'
export * from './currentTrack'
