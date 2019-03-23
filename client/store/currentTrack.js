const SET_NEW_TRACK = 'SET_NEW_TRACK'

export const setNewTrack = track => ({type: SET_NEW_TRACK, track})

export default function(state = {}, action) {
  if (action.type === SET_NEW_TRACK) return action.track
  return state
}
