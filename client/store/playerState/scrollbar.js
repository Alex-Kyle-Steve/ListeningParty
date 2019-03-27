const SET_ID = 'SET_ID'

export const setId = id => ({type: SET_ID, id})

// start moving bar when playing
export const startTick = (trackLength, position) => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  // don't dispatch another setInterval if intervalId isn't 0
  if (intervalId) return
  // myRange length is 500
  const normalizedPosition =
    Math.floor(500 / Math.ceil(trackLength / 1000)) *
    Math.floor(position / 1000)
  // set position of the bar
  document.getElementById('myRange').value = normalizedPosition
  // how much to move per sec
  const seekSpeed = Math.ceil(500 / Math.ceil(trackLength / 1000))
  // get the function from the elementßß
  const stepUp = document
    .getElementById('myRange')
    .stepUp.bind(document.getElementById('myRange'))
  // declare the callback
  const callback = function() {
    stepUp(seekSpeed.toString())
  }
  // set up animation tick
  dispatch(setId(setInterval(callback, 1000)))
}

// stop moving bar when pausing
export const stopTick = () => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  if (!intervalId) return
  clearInterval(intervalId)
  dispatch(setId(0))
}

// reducer for duration.
// integer in milisecond

export default function(state = 0, action) {
  if (action.type === SET_ID) return action.id
  return state
}
