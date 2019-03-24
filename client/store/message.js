import axios from 'axios'
import socket from '../socket'

/**
 * INITIAL STATE
 */
const initialState = {
  messages: [],
  newMessageEntry: ''
}

/**
 * ACTION TYPES
 */
const GET_MESSAGE = 'GET_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const WRITE_MESSAGE = 'WRITE_MESSAGE'

/**
 * ACTION CREATORS
 */
export const getMessage = message => {
  return {type: GET_MESSAGE, message}
}

export const getMessages = messages => {
  return {type: GET_MESSAGES, messages}
}

export const writeMessage = content => {
  return {type: WRITE_MESSAGE, content}
}

/**
 * THUNK CREATORS
 */
export const fetchMessages = () => {
  return async dispatch => {
    const response = await axios.get('/api/messages')
    const messages = response.data
    const action = getMessages(messages)
    dispatch(action)
  }
}

export const postMessage = message => {
  return async dispatch => {
    const response = await axios.post('/api/messages', message)
    const newMessage = response.data
    const action = getMessage(newMessage)
    dispatch(action)
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
    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      }
    default:
      return state
  }
}
