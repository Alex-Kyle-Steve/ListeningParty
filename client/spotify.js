import axios from 'axios'

// ***** SPOTIFY WEBPLAYBACK SDK ***** //

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

/**
 * dispatched by client socket
 * plays new song when current_track changes
 * @param {string} uri
 */
export const playTrack = uri => (dispatch, getState) => {
  const player = getState().player
  return playNewUri({uri, player}).then(() => console.log('playing uri:', uri))
}
