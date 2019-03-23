/**
 * SERVER SIDE SOCKET
 */

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // new uri from the channel owner
    socket.on('played-new-song', function(uri, channelId) {
      // broadcasts to other listeners in the channel
      this.broadcast.to(channelId).emit('recieved-new-song', uri)
    })

    //joining a channel
    socket.on('join-room', roomNumber => {
      socket.join(roomNumber)
      //will broadcast this message when someone joins the channel
      socket.to(roomNumber).emit('Hello', 'test')
      console.log(`joined room ${roomNumber}`)
    })

    socket.on('leave-room', roomNumber => {
      socket.leave(roomNumber)
      console.log(`leaving room ${roomNumber}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
