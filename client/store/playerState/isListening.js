import musicPlayerEvent, {handleStateReceived} from '../../music-player'

const SET_LISTENING = 'SET_LISTENING'

export const setListening = isListening => ({
  type: SET_LISTENING,
  isListening
})

export const startListening = () => dispatch => {
  musicPlayerEvent.on('state-received', handleStateReceived)
  dispatch(setListening(true))
}

export const stopListening = () => dispatch => {
  musicPlayerEvent.off('state-received', handleStateReceived)
  dispatch(setListening(false))
}

export default function(state = false, action) {
  if (action.type === SET_LISTENING) return action.isListening
  return state
}
