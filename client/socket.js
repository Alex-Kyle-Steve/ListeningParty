import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

//Emit test
// socket.emit('playbackState', {
//   state: 'test'
// })

//Listen for test
socket.on('playbackState', function(data) {
  //Console logs the state object that plays from the window on the server side
  console.log(data)
  socket.emit('playbackState', {
    state: data
  })
})

export default socket
