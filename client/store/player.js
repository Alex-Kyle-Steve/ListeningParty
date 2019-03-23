import musicPlayerEvent, {createPlayer, playNewUri} from '../music-player'

const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'
const TOGGLE_READY = 'TOGGLE_READY'
const TOGGLE_PAUSE = 'TOGGLE_PAUSE'

// ACTION CREATOR
export const setPlayerInstance = instance => ({
  type: SET_PLAYER_INSTANCE,
  instance
})
export const toggleReady = isReady => ({type: TOGGLE_READY, isReady})
export const togglePause = isPaused => ({type: TOGGLE_PAUSE, isPaused})
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
    dispatch(toggleReady(true))
  })
  // listener for when device is not ready
  instance.addListener('not_ready', device => {
    console.log('Device is not ready for playback', device)
    dispatch(toggleReady(false))
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
  playNewUri({uri, webPlayer: getState().player.instance})

const initialState = {instance: null, isReady: false, isPaused: false}

export default function(state = initialState, action) {
  if (action.type === SET_PLAYER_INSTANCE)
    return {...state, instance: action.instance}
  if (action.type === TOGGLE_READY) return {...state, isReady: action.isReady}
  if (action.type === TOGGLE_PAUSE) return {...state, isPaused: action.isPaused}
  return state
}
