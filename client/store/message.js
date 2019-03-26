import axios from 'axios'
import socket from '../socket'

/**
 * INITIAL STATE
 */
const initialState = {
  messages: []
}

/**
 * ACTION TYPES
 */
const GET_MESSAGE = 'GET_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'

/**
 * ACTION CREATORS
 */
export const getMessage = message => {
  return {type: GET_MESSAGE, message}
}

export const getMessages = messages => {
  return {type: GET_MESSAGES, messages}
}

/**
 * THUNK CREATORS
 */
export const fetchMessages = channelId => {
  return async dispatch => {
    const response = await axios.get(`/api/channels/${channelId}/messages`)
    const messages = response.data
    dispatch(getMessages(messages))
  }
}

export const postMessage = (message, user) => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message)
    const newMessage = response.data
    newMessage.user = user
    dispatch(getMessage(newMessage))
    socket.emit('new-message', newMessage)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }
    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state
  }
}
