import {EventEmitter} from 'events'
import axios from 'axios'
import socket from './socket'
import store, {playTrack, togglePlay, stopMusic} from './store'

const musicPlayerEvent = new EventEmitter()

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 */
const handleStateChanged = (playerState, dispatch, getState) => {
  // get current channel, track and user from the state
  const {channel: {selectedChannel}, user} = getState()
  // id of the current channel participating
  const channelId = selectedChannel.id
  // determine if the triggered player is owner's
  const isChannelOwner = selectedChannel.ownerId === user.id
  // if it was triggered by channel owner's player, manage all the listeners
  if (isChannelOwner) {
    socket.emit('owner-state-changed', channelId, playerState)
  }
}

// helper for determining what to update
const getChangedState = (
  isChannelPaused,
  channelTrackUri,
  channelPosition,
  myPlayer
) =>
  myPlayer.getCurrentState().then(playerState => {
    const shouldTogglePlay =
      !playerState || isChannelPaused !== playerState.paused
    const shouldChangeTrack =
      !playerState ||
      channelTrackUri !== playerState.track_window.current_track.uri
    const shouldScroll =
      !playerState ||
      (channelPosition > playerState.position + 3000 ||
        channelPosition < playerState.position - 3000)
    return {shouldTogglePlay, shouldChangeTrack, shouldScroll}
  })
/**
 * handler for when channel owner's player state changes
 * @param {WebPlaybackState} playerState
 * TODO:
 * - scrolling music
 */
const handleStateReceived = receivedState => {
  if (!receivedState)
    return store.getState().player && store.dispatch(stopMusic())
  const {paused, track_window: {current_track: {uri}}, position} = receivedState
  return getChangedState(paused, uri, position, store.getState().player).then(
    ({shouldChangeTrack, shouldTogglePlay, shouldScroll}) => {
      console.log('Playing song?', shouldChangeTrack ? 'YES' : 'NO')
      if (shouldChangeTrack) store.dispatch(playTrack(uri))
      console.log('Toggling play?', shouldTogglePlay ? 'YES' : 'NO')
      if (shouldTogglePlay) store.dispatch(togglePlay())
    }
  )
}

/**
 * handler for joining the channel
 * TODO:
 * - sync current track.
 */
const handleJoinChannel = channelId => {}

// listener for state change in spotify player
musicPlayerEvent.on('state-changed', handleStateChanged)

musicPlayerEvent.on('state-received', handleStateReceived)

// listener for when user joins a channel
// allow to catch-up to what's currently playing
musicPlayerEvent.on('joined-channel', handleJoinChannel)

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

export default musicPlayerEvent
