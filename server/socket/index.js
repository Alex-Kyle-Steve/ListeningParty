const axios = require('axios')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new_playback_uri', uri => {
      console.log('in server socket')
      io.sockets.emit('recieve_new_uri', uri)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
