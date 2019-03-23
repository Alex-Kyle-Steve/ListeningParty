import musicPlayerEvent, {createPlayer, playNewUri} from '../music-player'
import {setNewTrack} from './'

const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
const SET_READY = 'SET_READY'
const SET_PAUSE = 'SET_PAUSE'

// ACTION CREATOR
export const setPlayerInstance = instance => ({
  type: SET_PLAYER_INSTANCE,
  instance
})
export const setReady = isReady => ({type: SET_READY, isReady})
export const setPause = isPaused => ({type: SET_PAUSE, isPaused})
// END - ACTION CREATOR

// player listener

// THUNK CREATOR
export const initializePlayerInstance = () => async (dispatch, getState) => {
  // only create player if there is no instance
  if (getState().player.instance) {
    console.error('tried to create player instance when one already exists')
    return
  }
  // create soptify player
  const instance = createPlayer()
  // subscribe listeners  for when player state changes
  instance.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state, dispatch, getState)
  })
  // listener for when device is ready
  instance.addListener('ready', device => {
    console.log('Connected with Device', device)
    dispatch(setReady(true))
  })
  // listener for when device is not ready
  instance.addListener('not_ready', device => {
    console.log('Device is not ready for playback', device)
    dispatch(setReady(false))
  })
  // connect player to the Spotify Connect
  await instance.connect()
  // set the created player on the redux store
  dispatch(setPlayerInstance(instance))
}

/**
 * dispatched by client socket to play new track:
 * - when track changes
 * - when joining channel
 * @param {string} uri
 */
export const playTrack = uri => (dispatch, getState) =>
  playNewUri({uri, player: getState().player.instance})
    .then(() => getState().player.instance.getCurrentState())
    .then(playerState =>
      dispatch(setNewTrack(playerState.track_window.current_track))
    )

/**
 * toggle pause and resume of the spotify player when:
 * - owner pauses the song
 * @param {boolean} isPaused
 */
export const togglePause = isPaused => (dispatch, getState) => {
  const player = getState().player.instance
  return isPaused
    ? player.pause().then(() => {
        console.log('player paused: isPaused =', isPaused)
        dispatch(setPause(true))
      })
    : player.resume().then(() => {
        console.log('player resumed: isPaused =', isPaused)
        dispatch(setPause(false))
      })
}

/**
 * initial state of the player store state:
 * - instance: Spotify player object
 * - isReady: boolean determining whether player is ready
 * - isPaused: boolean determining if player is paused
 */
const initialState = {instance: null, isReady: false, isPaused: false}

export default function(state = initialState, action) {
  if (action.type === SET_PLAYER_INSTANCE)
    return {...state, instance: action.instance}
  if (action.type === SET_READY) return {...state, isReady: action.isReady}
  if (action.type === SET_PAUSE) return {...state, isPaused: action.isPaused}
  return state
}
