import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SELECTED_SONG = 'GET_SELECTED_CHANNEL'

/**
 * INITIAL STATE
 */
const defaultSong = {}

/**
 * ACTION CREATORS
 */
export const getSelectedSong = selectedSong => ({
  type: GET_SELECTED_SONG,
  selectedSong
})

/**
 * THUNK CREATORS
 */

export const fetchSelectedSong = songId => async dispatch => {
  let res
  try {
    res = await axios.get(`/api/songs/${songId}`)
    dispatch(getSelectedSong(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultSong, action) {
  switch (action.type) {
    case GET_SELECTED_SONG:
      return action.selectedSong
    default:
      return state
  }
}
