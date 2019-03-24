//front end
import io from 'socket.io-client'
import store, {playTrack, getMessage, togglePause} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')

  socket.on('new-message', message => {
    store.dispatch(getMessage(message))
  })
})

socket.on('owner-played-new-song', uri => {
  store.dispatch(playTrack(uri))
})

socket.on('owner-toggled-pause', isPaused => {
  store.dispatch(togglePause(isPaused))
})

export default socket
