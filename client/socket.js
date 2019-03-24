//front end
import io from 'socket.io-client'

import musicPlayerEvent from './music-player'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('received-state-change', playerState => {
  musicPlayerEvent.emit('state-received', playerState)
})

export default socket
