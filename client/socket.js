//front end
import io from 'socket.io-client'
import store, {playTrack} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Socket Connected!')
})

socket.on(
  'recieved-new-song',
  uri => store.dispatch(playTrack(uri))
  //   window.player.getCurrentState().then(state => {
  //     // if state is null, no music is playing. WHY SPOTIFY!!!!!!!!
  //     // just play the song if current track does not match the owner's song
  //     if (!state || state.track_window.current_track.uri !== uri)
  //       window.player._options.getOAuthToken(accessToken =>
  //         fetch(
  //           `https://api.spotify.com/v1/me/player/play?device_id=${
  //             window.player._options.id
  //           }`,
  //           {
  //             method: 'PUT',
  //             body: JSON.stringify({uris: [uri]}),
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${accessToken}`
  //             }
  //           }
  //         )
  //           .then(console.log)
  //           .catch(console.error)
  //       )
  //   })
)

export default socket
