//front end
import io from 'socket.io-client'

import musicPlayerEvent from './music-player'
import store, {getMessage} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')

  socket.on('new-message', message => {
    store.dispatch(getMessage(message))
  })
})

socket.on('received-state-change', playerState => {
  console.log('received state from owner')
  musicPlayerEvent.emit('state-received', playerState)
})

socket.on('new-listener', function(listenerId) {
  return store
    .getState()
    .player.getCurrentState()
    .then(playerState =>
      this.broadcast.to(listenerId).emit('received-state-change', playerState)
    )
})

socket.on('sync-to-channel')

export default socket
