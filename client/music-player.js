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

const setStoreState = function(
  playerPaused,
  playerTrack,
  playerPosition,
  storeState
) {
  // get redux store state
  const stateTrack = storeState.currentTrack
  const statePaused = storeState.isPaused
  // full length of current track playing
  const trackLength = playerTrack.duration_ms
  // change store states if uri or pause changed
  if (playerTrack.uri !== stateTrack.uri) {
    store.dispatch(setNewTrack(playerTrack))
  }
  // if player paused change
  if (playerPaused !== statePaused) {
    playerPaused
      ? store.dispatch(stopTick(trackLength, playerPosition))
      : store.dispatch(startTick(trackLength, playerPosition))
    store.dispatch(setPaused(playerPaused))
  } else {
    // sync the track location
    setPosition(playerPosition, trackLength)
  }
}

// returns a function that compares the provided spotify player state with the olde state
const newStateComparer = function(newPaused, newUri, newPosition) {
  return function(prevPaused, prevUri, prevPosition) {
    const shouldChangeTrack = newUri !== prevUri
    prevPaused = shouldChangeTrack ? false : prevPaused
    const shouldTogglePlay = newPaused === prevPaused
    prevPosition = shouldChangeTrack ? 0 : prevPosition
    const shouldSeek =
      newPosition > prevPosition + 3000 || newPosition < prevPosition - 3000
    return {shouldTogglePlay, shouldChangeTrack, shouldSeek}
  }
}

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 */
const handleStateChanged = (changedState, dispatch, getState) => {
  const {channel: {selectedChannel}, user} = getState()
  const isChannelOwner = selectedChannel.ownerId === user.id
  // only manage state through player only if you're owner
  if (!isChannelOwner) return
  socket.emit('owner-state-changed', selectedChannel.id, changedState)
  // spotify playerState from owner
  const playerPaused = changedState.paused
  const playerTrack = changedState.track_window.current_track
  const playerPosition = changedState.position
  setStoreState(
    playerPaused,
    playerTrack,
    playerPosition,
    getState().playerState,
    dispatch
  )
}

// ***** HANDLING HOST'S STATE CHANGE *****//

// creates a promise that will change the player depending on the received state
const stateChangePromise = (uri, paused, position) => (
  shouldTogglePlay,
  shouldChangeTrack,
  shouldSeek
) =>
  Promise.resolve(shouldChangeTrack && store.dispatch(playTrack(uri)))
    .then(() => shouldTogglePlay && store.dispatch(togglePause(paused)))
    .then(() => shouldSeek && store.dispatch(seekTrack(position)))

// handler for dealing with received owner player state
export const handleStateReceived = async receivedState => {
  console.log('state received!!!:', receivedState)
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState)
    return store.getState().player && store.dispatch(togglePause(true))

  // extract needed state from receivedState
  const {paused, track_window: {current_track: {uri}}, position} = receivedState

  // create a promise that will resolve stateChange
  const resolveStateChange = stateChangePromise(uri, paused, position)

  // get the state of my player
  const listenerState = await store.getState().player.getCurrentState()

  // if no music was playing, resolve the promise
  if (!listenerState) {
    return resolveStateChange(true, true, true).then(() => {})
  }

  // create a comparer for new state
  const compareNewState = newStateComparer(paused, uri, position)

  /**
   * TODO
   * - remove this cancer
   */
  const {shouldTogglePlay, shouldChangeTrack, shouldSeek} = compareNewState(
    listenerState.paused,
    listenerState.track_window.current_track.uri,
    listenerState.position
  )

  // call the helper promise to determine the needed adjustment
  return resolveStateChange(
    shouldTogglePlay,
    shouldChangeTrack,
    shouldSeek
  ).then(() =>
    setStoreState(
      paused,
      uri,
      position,
      store.getState().playerState,
      store.getState().dispatch
    )
  )
  /** Please remove cancer */
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
