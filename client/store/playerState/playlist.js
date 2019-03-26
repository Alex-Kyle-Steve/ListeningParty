import axios from 'axios'

const ADD_TRACK = 'ADD_TRACK'

const addTrack = trackData => ({
  type: ADD_TRACK,
  trackData
})

const addNewTrack = newTrack => dispatch =>
  axios.post('/api/songs', newTrack).then()

export default function(state = [], action) {
  if (action.type === ADD_TRACK) return [...state, action.trackData]
  return state
}
