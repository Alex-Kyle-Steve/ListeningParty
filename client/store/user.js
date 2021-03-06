import axios from 'axios'
import history from '../history'
import {getOwnedChannels, getFavoriteChannels} from './channel'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}
export const fetchOwnedChannels = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/channels`)
    dispatch(getOwnedChannels(res.data.ownedChannels))
  } catch (err) {
    console.error(err)
  }
}
export const fetchFavoriteChannels = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${userId}/favorites`)
    dispatch(getFavoriteChannels(res.data.favoriteChannel))
  } catch (err) {
    console.error(err)
  }
}
export const addFavoriteChannel = (userId, channelId) => async dispatch => {
  try {
    await axios.post(`/api/users/${userId}/favorites/${channelId}`)
    dispatch(fetchFavoriteChannels(userId))
  } catch (err) {
    console.error(err)
  }
}
export const removeFavoriteChannel = (userId, channelId) => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}/favorites/${channelId}`)
    dispatch(fetchFavoriteChannels(userId))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = (userId, userData) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, userData)
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(userId)
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
