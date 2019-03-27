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
  playerState,
  dispatch
) {
  // get redux store state
  const stateTrack = playerState.currentTrack
  const statePaused = playerState.isPaused
  // change store states if uri or pause changed
  if (playerTrack.uri !== stateTrack.uri) {
    console.log('track state changing')
    dispatch(setNewTrack(playerTrack))
  }
  // if player paused change
  if (playerPaused !== statePaused) {
    console.log('pause state changing')
    const trackLength = playerTrack.duration_ms
    const position = playerState.position
    playerPaused
      ? dispatch(startTick(trackLength, position))
      : dispatch(stopTick(trackLength, position))
    dispatch(setPaused(playerPaused))
  } else {
    setPosition(playerPosition, playerTrack.duration_ms)
  }
}

// returns a function that compares the provided spotify player state with the olde state
const newStateComparer = function(newPaused, newUri, newPosition) {
  console.log('at new state')
  return function(prevPaused, prevUri, prevPosition) {
    console.log('at compare state')
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
  const {channel: {selectedChannel}, user} = getState()
  const isChannelOwner = selectedChannel.ownerId === user.id
  if (!isChannelOwner) return
  handleOwnerChange(playerState, getState())
  // spotify playerState from owner
  const playerPaused = playerState.paused
  const playerTrack = playerState.track_window.current_track
  const playerPosition = playerState.position
  setStoreState(
    playerPaused,
    playerTrack,
    playerPosition,
    getState().playerState,
    dispatch
  )
}

// ***** HANDLING HOST'S STATE CHANGE *****//

const resolveStateChange = (uri, paused, position) => ({
  shouldTogglePlay,
  shouldChangeTrack,
  shouldSeek
}) =>
  Promise.resolve(shouldChangeTrack && store.dispatch(playTrack(uri)))
    .then(() => shouldTogglePlay && store.dispatch(togglePause(paused)))
    .then(() => shouldSeek && store.dispatch(seekTrack(position)))

export const handleStateReceived = async receivedState => {
  console.log('state received!!!:', receivedState)
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState)
    return store.getState().player && store.dispatch(togglePause(true))
  // extract needed state from owner's player
  const {paused, track_window: {current_track: {uri}}, position} = receivedState

  const stateChangePromise = resolveStateChange(uri, paused, position)

  const listenerState = await store.getState().player.getCurrentState()
  if (!listenerState)
    return stateChangePromise({
      shouldTogglePlay: true,
      shouldChangeTrack: true,
      shouldSeek: true
    }).then(() => {})
  const compareNewState = newStateComparer(paused, uri, position)
  const whatToChange = compareNewState(listenerState)
  // call the helper promise to determine the needed adjustment
  return stateChangePromise(whatToChange).then(() =>
    setStoreState(
      paused,
      uri,
      position,
      store.getState().playerState,
      store.getState().dispatch
    )
  )
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
