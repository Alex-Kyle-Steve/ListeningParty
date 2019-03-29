const SET_ID = 'SET_ID'

const setId = id => ({type: SET_ID, id})

// sets the position of the scrollbar.
// returns true/false by result
export const setPosition = (position, trackLength, range = 1000) => {
  const normalizedPosition = Math.ceil(range / trackLength * position)
  const scrollbar = document.getElementById('myRange')
  if (position === 0) {
    scrollbar.value = 0
    return true
  } else if (scrollbar.value > normalizedPosition + 3 || scrollbar.value < normalizedPosition - 3) {
    scrollbar.value = normalizedPosition
    return true
  }
  return false
}

// start moving bar when playing
export const startTick = trackLength => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  // don't dispatch another setInterval if intervalId isn't 0
  if (intervalId) return
  // myRange length is 1000ß
  // how much to move per 500 mlsec
  const seekSpeed = Math.floor(1000 / trackLength * 500)
  // get the function from the element and bind the this contact to itself
  const stepUp = document.getElementById('myRange').stepUp.bind(document.getElementById('myRange'))
  // declare the callback for setInterval
  const callback = function() {
    stepUp(seekSpeed.toString())
  }
  // set up animation tick
  dispatch(setId(setInterval(callback, 500)))
}

// stop moving bar when pausing
export const stopTick = () => (dispatch, getState) => {
  const intervalId = getState().playerState.scrollbar
  if (!intervalId) return
  clearInterval(intervalId)
  dispatch(setId(0))
}

// reducer for duration
export default function(state = 0, action) {
  if (action.type === SET_ID) return action.id
  return state
}
