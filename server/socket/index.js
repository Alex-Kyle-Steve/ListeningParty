/**
 * SERVER SIDE SOCKET
 */

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message)
    })

    // new uri from the channel owner
    socket.on('played-new-song', function(uri, channelId) {
      // broadcasts to other listeners in the channel
      this.broadcast.to(channelId).emit('recieved-new-song', uri)
    })

    //joining a channel
    socket.on('join-room', roomName => {
      socket.join(roomName)
      //will broadcast this message when someone joins the channel
      socket.to(roomName).emit('Hello', 'test')
      console.log(`joined ${roomName}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
