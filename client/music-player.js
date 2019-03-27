import {EventEmitter} from 'events'
import socket from './socket'
import store, {playTrack, togglePause, seekTrack} from './store'
import {
  setNewTrack,
  setPaused,
  startTick,
  stopTick,
  setPosition
} from './store/playerState'

const musicPlayerEvent = new EventEmitter()

// returns a function that compares the provided spotify player state with the olde state
const newStateComparer = function({newPaused, newUri, newPosition}) {
  return function({prevPaused, prevUri, prevPosition}) {
    const shouldChangeTrack = newUri !== prevUri
    prevPaused = shouldChangeTrack ? false : prevPaused
    const shouldTogglePlay = newPaused === prevPaused
    prevPosition = shouldChangeTrack ? 0 : prevPosition
    const shouldSeek =
      newPosition > prevPosition + 3000 || newPosition < prevPosition - 3000
    return {shouldTogglePlay, shouldChangeTrack, shouldSeek}
  }
}

// determine if player-state-change event is fired by channel owner then send state to others
const handleOwnerChange = (playerState, {channel: {selectedChannel}, user}) => {
  // determine if the triggered player is owner's
  const channelId = selectedChannel.id
  const isChannelOwner = selectedChannel.ownerId === user.id
  // if it was triggered by channel owner's player, manage all the listeners
  if (isChannelOwner) {
    socket.emit('owner-state-changed', channelId, playerState)
  }
}

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 */
const handleStateChanged = (playerState, dispatch, getState) => {
  handleOwnerChange(playerState, getState())
  // spotify playerState from owner
  const playerPaused = playerState.paused
  const playerTrack = playerState.track_window.current_track
  const playerPosition = playerState.position
  // get redux store state
  const stateTrack = getState().playerState.currentTrack
  const statePaused = getState().playerState.isPaused
  // change store states if uri or pause changed
  if (playerTrack.uri !== stateTrack.uri) {
    dispatch(setNewTrack(playerTrack))
  }
  // if player paused change
  if (playerPaused !== statePaused) {
    const trackLength = playerTrack.duration_ms
    const position = playerState.position
    playerPaused
      ? dispatch(startTick(trackLength, position))
      : dispatch(stopTick(trackLength, position))
    dispatch(setPaused(playerPaused))
  } else setPosition(playerPosition, playerTrack.duration_ms)
}

// ***** HANDLING HOST'S STATE CHANGE *****//

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
export const handleStateReceived = async receivedState => {
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState)
    return store.getState().player && store.dispatch(togglePause(true))
  // extract needed state from owner's player
  const {paused, track_window: {current_track: {uri}}, position} = receivedState

  const stateChangePromise = resolveStateChange(uri, paused, position)

  const listenerState = await store.getState().player.getCurrentState()
  if (!listenerState) {
    await stateChangePromise({
      shouldTogglePlay: true,
      shouldChangeTrack: true,
      shouldSeek: true
    })
    return
  }
  const compareNewState = newStateComparer(paused, uri, position)
  const whatToChange = compareNewState(listenerState)
  // call the helper promise to determine the needed adjustment
  await stateChangePromise(whatToChange)
}

// ***** END *****//

// when listener clicks the 'start listening' button
export const handleStartListening = channelId => {
  // subscribe listening
  musicPlayerEvent.on('state-received', handleStateReceived)
  // update listener player with channel-owner's state
  socket.emit('request-channel-state', channelId, socket.id)
}

// when listener clicks the 'stop listening' button
export const handleStopListening = () => {
  // pauses track
  store.dispatch(togglePause(true))
  // unsubscribe listening
  musicPlayerEvent.removeListener('state-received', handleStateReceived)
}

// listener for state change in spotify player
musicPlayerEvent.on('state-changed', handleStateChanged)
musicPlayerEvent.on('start-listening', handleStartListening)
musicPlayerEvent.on('stop-listening', handleStopListening)

export default musicPlayerEvent
