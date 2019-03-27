const SET_PAUSED = 'SET_PAUSED'

export const setPaused = isPaused => ({type: SET_PAUSED, isPaused})

export default function(state = true, action) {
  if (action.type === SET_PAUSED) return action.isPaused
  return state
}
