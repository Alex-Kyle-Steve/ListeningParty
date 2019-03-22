//back end
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-playback-uri', function(uri) {
      this.broadcast.emit('recieve-new-uri', uri)
    })

    //joining a channel
    socket.on('join-channel', roomName => {
      socket.join(roomName)
      //will broadcast this message when someone joins the channel
      socket.to(roomName).emit('Hello', {test: 'test'})
      console.log(`joined ${roomName}`)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
