import {combineReducers} from 'redux'
import currentTrack from './currentTrack'
import isListening from './isListening'

export default combineReducers({currentTrack, isListening})
export * from './currentTrack'
export * from './isListening'
