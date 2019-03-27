import axios from 'axios'
import {setNewTrack} from './currentTrack'
import {playTrack} from '../player'

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
    .then(({data}) => dispatch(setPlaylist(data)))

export const addNewTrack = newTrack => (dispatch, getState) =>
  axios
    // post the song to our songs model
    .post('/api/songs', newTrack)
    .then(({data}) => {
      // just in-case state updates slower, destructure old playlist and add in a new one
      const oldPlaylist = getState().playerState.playlist
      dispatch(addTrack(data))
      // maps and return only the array of id
      return [...oldPlaylist, data].map(({id}) => id)
    })
    // update our database with the new array
    .then(sortedId =>
      axios.put(
        `/api/channels/${getState().channel.selectedChannel.id}/playlist`,
        // might have to parse this to json
        {playlist: sortedId}
      )
    )

export const playNextTrack = () => (dispatch, getState) => {
  const currentPlaylist = getState().playerState.playlist
  if (!currentPlaylist.length) return null
  const nextTrack = currentPlaylist[0]
  const nextPlaylist = currentPlaylist.slice(1)
  dispatch(setNewTrack(nextTrack))
  dispatch(setPlaylist(nextPlaylist))
}

export const playSelectedTrack = uri => dispatch => dispatch(playTrack(uri))

export default function(state = [], action) {
  if (action.type === SET_PLAYLIST) return action.playlist
  if (action.type === ADD_TRACK) return [...state, action.trackData]
  return state
}
