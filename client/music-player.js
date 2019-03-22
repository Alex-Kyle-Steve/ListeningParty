import {EventEmitter} from 'events'
import axios from 'axios'
import socket from './socket'

const musicPlayerEvent = new EventEmitter()

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 *
 * @param {*} state
 * @param {*} isChannelOwner
 */
const handleStateChanged = (state, channelId, isChannelOwner) => {
  if (isChannelOwner) {
    const currentTrack = state.track_window.current_track
    socket.emit('played-new-song', currentTrack.uri, channelId)
  }
}

const handleJoinChannel = channelId => {}

// listener for state change in spotify player
musicPlayerEvent.on('state-changed', handleStateChanged)

// listener for when user joins a channel
// allow to catch-up to what's currently playing
musicPlayerEvent.on('join-channel', handleJoinChannel)

// grants access token from user session. only handles successful request
// - TODO: refreshing token, handling error
export const getAccessToken = () =>
  axios.get('/auth/spotify/token').then(res => res.data.accessToken)

export const createPlayer = () =>
  new Spotify.Player({
    //User token
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: callback => getAccessToken().then(callback)
  })

/**
 * function that makes an html request to web API and changes the track on the player
 * @param {{string, object: {object: {function, string}}}} param0: nested object of uri and the player
 * @returns {Spotify.Player}
 * TODO:
 * - add error-handling when playback fails
 * - fetch new OAuthToken when
 */
export const playNewUri = ({uri, webPlayer: {_options: {getOAuthToken, id}}}) =>
  getOAuthToken(accessToken =>
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
  )

export default musicPlayerEvent
