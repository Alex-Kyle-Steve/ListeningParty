import musicPlayerEvent from '../music-player'
import axios from 'axios'

const SET_PLAYER_INSTANCE = 'SET_PLAYER_INSTANCE'

// ACTION CREATOR
export const setPlayerInstance = instance => ({
  type: SET_PLAYER_INSTANCE,
  instance
})
// END - ACTION CREATOR

// player listener

// grants access token from user session. only handles successful request
// - TODO: refreshing token, handling error
export const getAccessToken = () =>
  axios.get('/auth/spotify/token').then(res => res.data.accessToken)

// creates player
export const createPlayer = () =>
  new Spotify.Player({
    name: 'Listening Party Spotify Player',
    getOAuthToken: callback => getAccessToken().then(callback)
  })

// returns a helper function for creating fetch call
const makePlayRequest = (uri, id) => accessToken =>
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
    method: 'PUT',
    body: JSON.stringify({uris: [uri]}),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => response)
    .catch(console.log)

/**
 * function that makes an html request to web API and changes the track on the player
 * @param {{string, object: {object: {function, string}}}} param0: nested object of uri and the player
 * @returns {Spotify.Player}
 * TODO:
 * - add error-handling when playback fails
 * - fetch new auth token when expired
 */
export const playNewUri = ({uri, player: {_options: {getOAuthToken, id}}}) =>
  getOAuthToken(makePlayRequest(uri, id))

// THUNK CREATOR
export const initializePlayerInstance = () => async (dispatch, getState) => {
  // only create player if there is no instance
  if (getState().player) {
    console.error('tried to create player instance when one already exists')
    return
  }
  // create soptify player
  const instance = createPlayer()
  // subscribe listeners  for when player state changes
  instance.addListener('player_state_changed', state => {
    // emit event to socket: check music-player.js
    musicPlayerEvent.emit('state-changed', state)
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
  return playNewUri({uri, player}).then(() => console.log('playing uri:', uri))
}

/**
 * toggle pause and resume of the spotify player when:
 * - owner pause state changes
 * @param {boolean} isPaused
 */
export const togglePause = isPaused => (dispatch, getState) => {
  const player = getState().player
  return isPaused
    ? player.pause().then(() => {
        console.log('pausing track')
      })
    : player.resume().then(() => {
        console.log('resuming track')
      })
}

export const seekTrack = newPosition => (dispatch, getState) => {
  const player = getState().player
  return player.seek(newPosition).then(() => {
    console.log(`changed to position ${newPosition}`)
  })
}

export default function(state = null, action) {
  if (action.type === SET_PLAYER_INSTANCE) return action.instance
  return state
}
