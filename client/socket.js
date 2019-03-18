import io from 'socket.io-client'
import axios from 'axios'
// function getState() {
//   axios({
//     method: 'get',
//     url: `https://api.spotify.com/v1/me/player/currently-playing`,
//     headers: {
//       ['Authorization']:
//         AccessToken
//     }
//   })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(error => {
//       console.log(error)
//     })
// }

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})
//Emit test

socket.emit('playbackState', {
  state: 'test'
})

//Listen for test
socket.on('playbackState', function(data) {
  console.log(data)
})

export default socket
