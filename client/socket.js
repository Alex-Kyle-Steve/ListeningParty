//front end
import io from 'socket.io-client'

const socket = io(window.location.origin)
const roomName = window.location.pathname
// socket.on('connect', () => {
//   console.log('Socket Connected!')
//   console.log('roomName', roomName)
//   socket.emit('join-channel', roomName)
//   socket.on('Hello', function(data) {
//     console.log('test emit from server room', data)
//   })
// })

export default socket
