import {EventEmitter} from 'events'
import axios from 'axios'
import socket from './socket'

const musicPlayerEvent = new EventEmitter()

// handler for musicPlayer events
const handleStateChanged = state => {}
const handleJoinChannel = channelId => {}

// subscribe music player events
musicPlayerEvent.on('state-changed', handleStateChanged)
musicPlayerEvent.on('join-channel', handleJoinChannel)

// emitter subscribed to player-state-changed
const emitStateChanged = state => {
  musicPlayerEvent.emit('state-changed', state)
}

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
// .then(player => {
//   // subscribe listeners that emits state change event
//   player.addListener('player-state-changed', emitStateChanged)
//   return player
// })
// .then(player => player.connect())

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
