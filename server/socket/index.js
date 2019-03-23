/**
 * SERVER SIDE SOCKET
 */

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('join-room', roomNumber => {
      socket.join(roomNumber)
      //will broadcast this message when someone joins the channel
      console.log(`${socket.id} joined room ${roomNumber}`)
    })
    // leaving a channel
    socket.on('leave-room', roomNumber => {
      socket.leave(roomNumber)
      console.log(`${socket.id} leaving room ${roomNumber}`)
    })

    /**
     * TODO:
     * - if joining active channel, catch up
     * - when track is not playing, leave it paused
     */
    socket.on('sync-track')

    // owner changed the song
    socket.on('played-new-song', function(uri, channelId) {
      // broadcasts to other listeners in the channel
      this.broadcast.to(channelId).emit('owner-played-new-song', uri)
    })
    // owner toggled pause
    socket.on('toggled-pause', function(isPaused, channelId) {
      this.broadcast.to(channelId).emit('owner-toggled-pause', isPaused)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
