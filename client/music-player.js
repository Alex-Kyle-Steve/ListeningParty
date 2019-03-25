import {EventEmitter} from 'events'
import socket from './socket'
import store, {playTrack, togglePause, seekTrack} from './store'

const {dispatch, getState} = store

const musicPlayerEvent = new EventEmitter()

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 */
const handleStateChanged = playerState => {
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
  Promise.resolve(shouldChangeTrack && dispatch(playTrack(uri)))
    .then(() => shouldTogglePlay && dispatch(togglePause(paused)))
    .then(() => shouldSeek && dispatch(seekTrack(position)))

/**
 * handler for when channel owner's player state changes
 * @param {WebPlaybackState} playerState
 * TODO:
 * - seek music
 */
const handleStateReceived = receivedState => {
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState) return getState().player && dispatch(togglePause(true))
  // extract needed state from owner's player
  const {paused, track_window: {current_track: {uri}}, position} = receivedState
  // call the helper promise to determine the needed adjustment
  return getChangedState(paused, uri, position, getState().player).then(
    whatStateToChange =>
      resolveStateChange(uri, paused, position)(whatStateToChange)
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

// listener for state received from the channel owner
musicPlayerEvent.on('state-received', handleStateReceived)

// listener for when user joins a channel
// allow to catch-up to what's currently playing
musicPlayerEvent.on('joined-channel', handleJoinChannel)

export default musicPlayerEvent
