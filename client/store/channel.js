import axios from 'axios'

//Action Types
const SET_CHANNEL = 'SET_CHANNEL'

//Initial State

const defaultChannel = {}

//Action Creator
const setCurrentChannel = channel => {
  return {
    type: SET_CHANNEL,
    channel
  }
}

//Thunk Creators
export const setCurrentChannelThunk = channel => dispatch => {
  try {
    dispatch(setCurrentChannel(channel))
  } catch (error) {
    console.log(error)
  }
}

//Reducer

export default function(state = defaultChannel, action) {
  switch (action.type) {
    case SET_CHANNEL:
      return action.channel
    default:
      return state
  }
}
