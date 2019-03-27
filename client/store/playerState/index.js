import {combineReducers} from 'redux'
import currentTrack from './currentTrack'
import isListening from './isListening'
import playlist from './playlist'
import isPaused from './isPaused'

export default combineReducers({currentTrack, isListening, playlist, isPaused})
export * from './currentTrack'
export * from './isListening'
export * from './playlist'
export * from './isPaused'
