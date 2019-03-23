//front end
import io from 'socket.io-client'
import store, {playTrack, togglePause} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('owner-played-new-song', (uri, isPaused) => {
  store.dispatch(playTrack(uri, isPaused))
})

socket.on('owner-toggled-pause', isPaused => {
  store.dispatch(togglePause(isPaused))
})

export default socket
