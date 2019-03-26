//front end
import io from 'socket.io-client'

import musicPlayerEvent from './music-player'
import store, {getMessage} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')

  socket.on('new-message', message => {
    store.dispatch(getMessage(message))
  })
})

socket.on('received-state-change', playerState => {
  musicPlayerEvent.emit('state-received', playerState)
})

socket.on('new-listener', function(listenerId) {
  const {channel: {selectedChannel}, user, player} = store.getState()
  const isOwner = selectedChannel.ownerId === user.id
  if (isOwner)
    socket.on('request', (song, requester) => {
      console.log(song, requester)
    })
  return (
    isOwner &&
    player
      .getCurrentState()
      .then(playerState =>
        socket.emit('owner-state-changed', listenerId, playerState)
      )
  )
})

socket.on('sync-to-channel')

export default socket
