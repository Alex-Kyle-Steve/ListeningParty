import musicPlayerEvent, {createPlayer, playNewUri} from '../music-player'

const SET_PLAYER = 'SET_PLAYER'

// ACTION CREATOR
export const setPlayer = player => ({type: SET_PLAYER, player})
// END - ACTION CREATOR

// THUNK CREATOR
export const initializePlayer = () => async (dispatch, getState) => {
  const player = createPlayer()
  player.addListener('player_state_changed', state => {
    const {channel: {selectedChannel}, user} = getState()
    musicPlayerEvent.emit(
      'state-changed',
      state,
      selectedChannel.id,
      selectedChannel.ownerId === user.id
    )
  })
  player.addListener('ready', device => {
    console.log('Connected with Device', device)
  })
  player.addListener('not_ready', device => {
    console.log('Device is not ready for playback', device)
  })
  await player.connect()
  dispatch(setPlayer(player))
}

export const playTrack = uri => (dispatch, getState) =>
  dispatch(playNewUri({uri, webPlayer: getState().player}))

export default function(state = {}, action) {
  if (action.type === SET_PLAYER) return action.player
  return state
}
