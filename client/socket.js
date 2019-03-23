//front end
import io from 'socket.io-client'
import store, {playTrack} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on('recieved-new-song', uri => {
  store.dispatch(playTrack(uri))
})

export default socket
