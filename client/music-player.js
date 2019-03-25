import {EventEmitter} from 'events'
import axios from 'axios'
import socket from './socket'
import store, {playTrack, togglePause, seekTrack} from './store'

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

// listener for state change in spotify player
musicPlayerEvent.on('state-changed', handleStateChanged)

// helper for determining what to update
const getChangedState = (
  isChannelPaused,
  channelTrackUri,
  channelPosition,
  myPlayer
) =>
  myPlayer.getCurrentState().then(playerState => {
    if (!playerState)
      return {shouldTogglePlay: true, shouldChangeTrack: true, shouldSeek: true}
    const listenerTrackUri = playerState.track_window.current_track.uri
    // should we change track
    const shouldChangeTrack = channelTrackUri !== listenerTrackUri
    // depending on uri change, listener's player will automatically play
    const isListenerPaused = shouldChangeTrack ? false : playerState.paused
    // should we toggle playback?
    const shouldTogglePlay = isChannelPaused !== isListenerPaused
    // if we're playing new uri, listener's position will be at 0 mark
    const listenerPosition = shouldChangeTrack ? 0 : playerState.position
    // should we seek through track?
    // apply 3 second frame to account for latency
    const shouldSeek =
      channelPosition > listenerPosition + 3000 ||
      channelPosition < listenerPosition - 3000
    return {shouldTogglePlay, shouldChangeTrack, shouldSeek}
  })

// promise creator for calling thunks to update the listener's player
const resolveStateChange = (uri, paused, position) => ({
  shouldTogglePlay,
  shouldChangeTrack,
  shouldSeek
}) =>
  Promise.resolve(shouldChangeTrack && store.dispatch(playTrack(uri)))
    .then(() => shouldTogglePlay && store.dispatch(togglePause(paused)))
    .then(() => shouldSeek && store.dispatch(seekTrack(position)))
/**
 * handler for when channel owner's player state changes
 * subscribed to listening players only when listener requests
 * check store/playerState/isListening.js
 * @param {WebPlaybackState} playerState
 * TODO:
 * - seek music
 */
export const handleStateReceived = receivedState => {
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState)
    return store.getState().player && store.dispatch(togglePause(true))
  // extract needed state from owner's player
  const {paused, track_window: {current_track: {uri}}, position} = receivedState
  // call the helper promise to determine the needed adjustment
  return getChangedState(paused, uri, position, store.getState().player).then(
    whatStateToChange =>
      resolveStateChange(uri, paused, position)(whatStateToChange)
  )
}

export const handleStartListening = channelId => {
  // subscribe listening
  musicPlayerEvent.on('state-received', handleStateReceived)
  socket.emit('request-channel-state', channelId, socket.id)
}

export const handleStopListening = channelId => {
  // unsubscribe listening
  musicPlayerEvent.off('state-received', handleStateReceived)
}

musicPlayerEvent.on('start-listening', handleStartListening)
musicPlayerEvent.on('stop-listening', handleStopListening)

export default musicPlayerEvent

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
