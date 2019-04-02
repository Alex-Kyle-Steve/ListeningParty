/**
 * SERVER SIDE SOCKET
 */

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      socket.to(message.channelId.toString()).emit('new-message', message)
    })

    socket.on('request', (song, user, channelId) => {
      socket.to(channelId).emit('request-received', song, user)
    })

    socket.on('join-room', (roomNumber, isOwner) => {
      socket.join(roomNumber)
      console.log('owner?', isOwner)
      console.log(`${socket.id} joined room ${roomNumber}`)
    })

    // leaving a channel
    socket.on('leave-room', function(roomNumber, isOwner) {
      socket.leave(roomNumber)
      if (isOwner) this.broadcast.to(roomNumber).emit('received-state-change', null)
      console.log(`${socket.id} left room ${roomNumber}`)
    })

    socket.on('setting-playlist', (channelId, playlist) => {
      socket.to(channelId).emit('channel-set-playlist', playlist)
    })
    socket.on('adding-track', (channelId, trackData) => {
      socket.to(channelId).emit('channel-add-track', trackData)
    })

    socket.on('request-channel-state', function(channelId, listenerId) {
      this.broadcast.to(channelId).emit('new-listener', listenerId)
    })

    // when channel owner emits a state-change event
    socket.on('owner-state-changed', function(channelId, playerState) {
      this.broadcast.to(channelId).emit('received-state-change', playerState)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
