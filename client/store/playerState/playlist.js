import axios from 'axios'

const SET_PLAYLIST = 'SET_PLAYLIST'
const ADD_TRACK = 'ADD_TRACK'

const setPlaylist = playlist => ({
  type: SET_PLAYLIST,
  playlist
})
const addTrack = trackData => ({
  type: ADD_TRACK,
  trackData
})

export const fetchChannelPlaylist = channelId => dispatch =>
  axios
    .get(`/api/channels/${channelId}/playlist`)
    .then(playlist => dispatch(setPlaylist(playlist)))

// sorts the state's playlist into track
const getSortedTrackId = playlist => id => [
  ...playlist.map(track => track.id),
  id
]
export const addNewTrack = newTrack => (dispatch, getState) =>
  axios
    // post the song to our songs model
    .post('/api/songs', newTrack)
    // sort the playlist into array of id
    .then(({id}) => {
      const playlist = getState().playerState.playlist
      return getSortedTrackId(playlist)(id)
    })
    // update our database
    .then(sortedId =>
      axios.put(
        `/api/channels/${getState().channel.selectedChannel.id}/playlist`,
        // might have to parse this to json
        {playlist: sortedId}
      )
    )
    // update our state
    .then(() => dispatch(addTrack(newTrack)))

export default function(state = [], action) {
  if (action.type === SET_PLAYLIST) return action.playlist
  if (action.type === ADD_TRACK) return [...state, action.trackData]
  return state
}
