//front end
import io from 'socket.io-client'

const socket = io(window.location.origin)
const roomName = window.location.pathname

socket.on('connect', () => {
  console.log('Socket Connected!')
  console.log('roomName', roomName)
  socket.emit('join-channel', roomName)
  socket.on('Hello', function(data) {
    console.log('test emit from server room', data)
  })
})

socket.on('recieve_new_uri', state => {
  if (state.track_window.current_track.uri !== uri)
    window.player._options.getOAuthToken(accessToken =>
      fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${
          window.player._options.id
        }`,
        {
          method: 'PUT',
          body: JSON.stringify({uris: [uri]}),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(console.log)
        .catch(console.error)
    )
})

export default socket
