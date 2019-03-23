import musicPlayerEvent, {createPlayer, playNewUri} from '../music-player'

const SET_PLAYER = 'SET_PLAYER'
const TOGGLE_READY = 'TOGGLE_READY'
const TOGGLE_PAUSE = 'TOGGLE_PAUSE'

const initialState = {instance: null, isReady: false, isPaused: false}

// ACTION CREATOR
export const setPlayer = player => ({type: SET_PLAYER, player})
export const toggleReady = isReady => ({type: TOGGLE_READY, isReady})
export const togglePause = isPaused => ({type: TOGGLE_PAUSE, isPaused})
// END - ACTION CREATOR

//player listener

// THUNK CREATOR
export const initializePlayer = () => async (dispatch, getState) => {
  // only create player if there is none
  if (getState().player) {
    console.log('player already exist')
    return
  }
  // create soptify player
  const player = createPlayer()
  // subscribe listeners  for when player state changes
  player.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state, getState)
  })
  // listener for when device is ready
  player.addListener('ready', device => {
    console.log('Connected with Device', device)
  })
  // listener for when device is not ready
  player.addListener('not_ready', device => {
    console.log('Device is not ready for playback', device)
  })
  // connect player to the Spotify Connect
  await player.connect()
  // set the created player on the redux store
  dispatch(setPlayer(player))
}

export const playTrack = uri => (dispatch, getState) =>
  playNewUri({uri, webPlayer: getState().player})

export default function(state = initialState, action) {
  if (action.type === SET_PLAYER) return action.player
  return state
}
