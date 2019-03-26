import axios from 'axios'

//Action Types

const TOGGLE_PLAY = 'TOGGLE_PLAY'
const SKIP_TRACK = 'SKIP_TRACK'
const PREV_TRACK = 'PREV_TRACK'

// Action Creators
// Play ; End Point PUT https://api.spotify.com/v1/me/player/play
export const togglePlay = () => {
  return {
    TOGGLE_PLAY
  }
}

//Skip; End Point POST https://api.spotify.com/v1/me/player/next
// export const skipTrack =
//Prev: End Point POST https://api.spotify.com/v1/me/player/previous
// export const prevTrack

// Thunk
export const togglePlayThunk = token => {
  return function() {
    axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

//Initial state
const initialState = {}

//Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return {...state}
    case SKIP_TRACK:
      return {...state}
    case PREV_TRACK:
      return {...state}
    default:
      return state
  }
}
