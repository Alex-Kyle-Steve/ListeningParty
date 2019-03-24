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
  musicPlayerEvent.emit('state-received', playerState)
})

export default socket
