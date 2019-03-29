import {EventEmitter} from 'events'
import socket from './socket'
import store, {playTrack, togglePause, seekTrack} from './store'
import {setNewTrack, setPaused, startTick, stopTick, setPosition} from './store/playerState'

const musicPlayerEvent = new EventEmitter()

/***************** HELPER FUNCTIONS  */

// returns a function that compares the provided spotify player state with the redux state
const getStateComparer = function(receivedState) {
  const newUri = receivedState.track_window.current_track.uri
  const newPaused = receivedState.paused
  const newPosition = receivedState.position
  return function(currentState) {
    const prevUri = currentState.track_window.current_track.uri
    let prevPaused = currentState.paused
    let prevPosition = currentState.position
    const shouldChangeTrack = newUri !== prevUri
    prevPaused = shouldChangeTrack ? false : prevPaused
    const shouldTogglePlay = newPaused === prevPaused
    prevPosition = shouldChangeTrack ? 0 : prevPosition
    const shouldSeek = newPosition > prevPosition + 3000 || newPosition < prevPosition - 3000
    // please don't forget to fix this cancer
    return {shouldTogglePlay, shouldChangeTrack, shouldSeek}
  }
}

// creates a promise that will change the player depending on the received state
function getStateChangePromise(receivedState) {
  const {paused, track_window: {current_track: {uri}}, position} = receivedState
  return (shouldTogglePlay, shouldChangeTrack, shouldSeek) => {
    // return promise change so each consecutive call to spotify API will await for it to resolve
    return Promise.resolve(shouldChangeTrack && store.dispatch(playTrack(uri)))
      .then(() => shouldTogglePlay && store.dispatch(togglePause(paused)))
      .then(() => shouldSeek && store.dispatch(seekTrack(position)))
  }
}

/**
 * handles redux state to be same as the spotify player
 * TODO:
 * - separate this to handle each state separately
 * - let redux store handle these state separately through their own thunk
 */
function setStoreState(spotifyState, storeState, dispatch) {
  const playerPaused = spotifyState.paused
  const playerTrack = spotifyState.track_window.current_track
  const playerPosition = spotifyState.position
  // get redux store state
  const stateTrack = storeState.currentTrack
  const statePaused = storeState.isPaused
  // full length of current track playing
  const trackLength = playerTrack.duration_ms
  // what we will return
  const setResult = {trackChanged: false, positionChanged: false, pausedChanged: false}
  // change store states if uri or pause changed
  if (playerTrack.uri !== stateTrack.uri) {
    dispatch(setNewTrack(playerTrack))
    setResult.trackChanged = true
  }
  // sync the track location
  setPosition(playerPosition, trackLength)
  // if player paused change
  if (playerPaused !== statePaused) {
    playerPaused ? dispatch(stopTick()) : dispatch(startTick(trackLength))
    dispatch(setPaused(playerPaused))
  }
}

/* END HELPER FUNCTION **************** /

// ***** HANDLING OWNER"S SPOTIFY PLAYER CHANGE ***** //

/**
 * handler for musicPlayerEvents when the player state changes
 * emit event to other socket when it is triggered by the channel owner
 */
const handleOwnerStateChanged = (changedState, dispatch, getState) => {
  const selectedChannel = getState().selectedChannel
  socket.emit('owner-state-changed', selectedChannel.id, changedState)
  // get state on redux
  const storeState = getState().playerState
  setStoreState(changedState, storeState, dispatch)
}

// ***** HANDLING HOST'S STATE CHANGE ***** //

// handler for dealing with received owner player state
// subscribed when listener first enters the room
const handleStateReceived = async receivedState => {
  // if received state is null, and our player is active, pause it just in case
  if (!receivedState) return store.getState().player && store.dispatch(togglePause(true))

  // create a promise that will resolve stateChange
  // - remove this cancer
  const resolveStateChange = getStateChangePromise(receivedState)
  // get the state of my player
  const listenerState = await store.getState().player.getCurrentState()
  const storeState = store.getState().playerState
  // if no music is playing, set my state to null as well
  if (!listenerState) {
    return resolveStateChange(true, true, true).then(() =>
      setStoreState(receivedState, storeState, store.dispatch)
    )
  }
  // create a comparer for new state
  const compareNewState = getStateComparer(receivedState)
  // - Please remove cancer
  const {shouldTogglePlay, shouldChangeTrack, shouldSeek} = compareNewState(listenerState)
  // call the helper promise to determine the needed adjustment
  return resolveStateChange(shouldTogglePlay, shouldChangeTrack, shouldSeek).then(() =>
    setStoreState(receivedState, storeState, store.dispatch)
  )
}

// ***** END ***** //

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
musicPlayerEvent.on('state-changed', handleOwnerStateChanged)
musicPlayerEvent.on('start-listening', handleStartListening)
musicPlayerEvent.on('stop-listening', handleStopListening)

export default musicPlayerEvent
