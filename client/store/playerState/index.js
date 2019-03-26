import {combineReducers} from 'redux'
import currentTrack from './currentTrack'
import isListening from './isListening'
import playlist from './playlist'

export default combineReducers({currentTrack, isListening, playlist})
export * from './currentTrack'
export * from './isListening'
export * from './playlist'
