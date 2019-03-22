import axios from 'axios'
import {createPlayer, playNewUri} from '../music-player'

const SET_PLAYER = 'SET_PLAYER'
const SET_READY = 'SET_READY'

// ACTION CREATOR
export const setPlayer = player => ({type: SET_PLAYER, player})
export const setReady = isReady => ({type: SET_READY, isReady})
// END - ACTION CREATOR

export const initializePlayer = () => dispatch =>
  dispatch(setPlayer(createPlayer()))

export const playTrack = uri => (dispatch, getState) =>
  dispatch(playNewUri(uri, getState()))

export default function(state = {}, action) {
  if (action.type === SET_PLAYER) return action.player
  else if (action.type === SET_READY) return {...state, isReady: action.isReady}
  return state
}
