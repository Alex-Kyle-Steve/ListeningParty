//back end
module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    //Might be useful logic for storing chats for different rooms later
    // const rooms = {}
    // function getRoom(roomName) {
    //   if (!rooms[roomName]) {
    //     rooms[roomName] = []
    //   }
    //   return rooms[roomName]
    // }
    socket.on('playbackState', function(data) {
      console.log('from client', data)
      io.sockets.emit('playbackStateFromServer', data)
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
