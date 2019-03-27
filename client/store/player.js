import musicPlayerEvent from '../music-player'
import {createPlayer, playNewUri} from '../spotify'

const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'

// ACTION CREATOR
export const setPlayerInstance = instance => ({
  type: SET_PLAYER_INSTANCE,
  instance
})
// END - ACTION CREATOR

// player listener

// THUNK CREATOR
export const initializePlayerInstance = () => async (dispatch, getState) => {
  // only create player if there is no instance
  if (getState().player) {
    console.error('tried to create player instance when one already exists')
    return
  }
  // create soptify player
  const instance = createPlayer()
  instance.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state, dispatch, getState)
  })
  // listener for when device is ready
  instance.addListener('ready', device => {
    console.log('Connected with Device', device)
  })
  // listener for when device is not ready
  instance.addListener('not_ready', device => {
    console.log('Device is not ready for playback', device)
  })
  // connect player to the Spotify Connect
  await instance.connect()
  // set the created player on the redux store
  dispatch(setPlayerInstance(instance))
}

/**
 * dispatched by client socket
 * plays new song when current_track changes
 * @param {string} uri
 */
export const playTrack = uri => (dispatch, getState) => {
  const player = getState().player
  return playNewUri({uri, player}).then(response =>
    console.log('played new uri: response =', response)
  )
}

export const setAsOwner = () => (dispatch, getState) => {
  getState().player.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state, dispatch, getState)
  })
}

export const removeAsOwner = () => (dispatch, getState) => {
  getState().player.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state, dispatch, getState)
  })
}

/**
 * toggle pause and resume of the spotify player when:
 * - owner pause state changes
 * @param {boolean} isPaused
 */
export const togglePause = isPaused => (dispatch, getState) => {
  const player = getState().player
  return isPaused
    ? player.pause().then(() => console.log('pausing track'))
    : player.resume().then(() => console.log('resuming track'))
}

export const seekTrack = newPosition => (dispatch, getState) => {
  const player = getState().player
  return player
    .seek(newPosition)
    .then(() => console.log(`changed to position ${newPosition}`))
}

export default function(state = null, action) {
  if (action.type === SET_PLAYER_INSTANCE) return action.instance
  return state
}
