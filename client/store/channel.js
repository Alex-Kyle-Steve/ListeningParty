import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_CHANNELS = 'GET_ALL_CHANNELS'
const GET_OWNED_CHANNELS = 'GET_OWNED_CHANNELS'
const GET_FAVORITE_CHANNELS = 'GET_FAVORITE_CHANNELS'
const GET_SELECTED_CHANNEL = 'GET_SELECTED_CHANNEL'

/**
 * INITIAL STATE
 */
const defaultChannels = {
  allChannels: {},
  ownedChannels: {},
  favoriteChannels: {},
  selectedChannel: {}
}

/**
 * ACTION CREATORS
 */
export const getAllChannels = channels => ({type: GET_ALL_CHANNELS, channels})
export const getOwnedChannels = channels => ({
  type: GET_OWNED_CHANNELS,
  channels
})
export const getFavoriteChannels = channels => ({
  type: GET_FAVORITE_CHANNELS,
  channels
})
export const getSelectedChannel = selectedChannel => ({
  type: GET_SELECTED_CHANNEL,
  selectedChannel
})

/**
 * THUNK CREATORS
 */

export const fetchChannels = () => async dispatch => {
  let res
  try {
    console.log('Inside channels store fetchChannels thunk')
    res = await axios.get(`/api/channels`)
    dispatch(getAllChannels(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchSelectedChannel = channelId => async dispatch => {
  let res
  try {
    res = await axios.get(`/api/channels/${channelId}`)
    dispatch(getSelectedChannel(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultChannels, action) {
  switch (action.type) {
    case GET_ALL_CHANNELS:
      return {...state, allChannels: action.channels}
    case GET_OWNED_CHANNELS:
      return {...state, ownedChannels: action.channels}
    case GET_FAVORITE_CHANNELS:
      return {...state, favoriteChannels: action.channels}
    case GET_SELECTED_CHANNEL:
      return {...state, selectedChannel: action.selectedChannel}
    default:
      return state
  }
}
