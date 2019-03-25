import musicPlayerEvent, {handleStateReceived} from '../../music-player'

const SET_LISTENING = 'SET_LISTENING'

export const setListening = isListening => ({
  type: SET_LISTENING,
  isListening
})

export const startListening = () => (dispatch, getState) => {
  const currentChannelId = getState().channel.selectedChannel.id
  musicPlayerEvent.emit('start-listening', currentChannelId)
  dispatch(setListening(true))
}

export const stopListening = () => (dispatch, getState) => {
  const currentChannelId = getState().channel.selectedChannel.id
  musicPlayerEvent.emit('stop-listening', currentChannelId)
  dispatch(setListening(false))
}

export default function(state = false, action) {
  if (action.type === SET_LISTENING) return action.isListening
  return state
}
