const SET_ID = 'SET_ID'

export const setId = id => ({type: SET_ID, id})

export const setPosition = (position, trackLength, range = 1000) => {
  const scrollbar = document.getElementById('myRange')
  if (position === 0) {
    scrollbar.value = 0
    return
  }
  const normalizedPosition = Math.ceil(range / trackLength * position)
  if (
    scrollbar.value > normalizedPosition + 3 ||
    scrollbar.value < normalizedPosition - 3
  )
    scrollbar.value = normalizedPosition
}

// start moving bar when playing
export const startTick = (trackLength, position) => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  // don't dispatch another setInterval if intervalId isn't 0
  if (intervalId) return
  // myRange length is 1000
  setPosition(position, trackLength)
  // how much to move per sec
  const seekSpeed = Math.floor(1000 / trackLength * 500)
  // get the function from the element
  const stepUp = document
    .getElementById('myRange')
    .stepUp.bind(document.getElementById('myRange'))
  // declare the callback
  const callback = function() {
    stepUp(seekSpeed.toString())
  }
  // set up animation tick
  dispatch(setId(setInterval(callback, 500)))
}

// stop moving bar when pausing
export const stopTick = (trackLength, position) => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  if (!intervalId) return
  setPosition(position, trackLength)
  clearInterval(intervalId)
  dispatch(setId(0))
}

// reducer for duration.
// integer in milisecond

export default function(state = 0, action) {
  if (action.type === SET_ID) return action.id
  return state
}
