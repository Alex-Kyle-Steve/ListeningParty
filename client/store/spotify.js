import axios from 'axios'

export const getAccessToken = () =>
  axios
    .get('/auth/spotify/token')
    // send status code if the status was 200
    .then(res => res.status === 200 && res.data.accessToken)

// export const setCurrentTrack = ({
//   spotifyUri,
//   playerInstance: {_options: {getOAuthToken, id}}
// }) => {

// }

// const play = ({
//   spotify_uri,
//   playerInstance: {_options: {getOAuthToken, id}}
// }) => {
//   getOAuthToken(access_token => {
//     fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({uris: [spotify_uri]}),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${access_token}`
//       }
//     })
//   })
// }

// play({
//   playerInstance: new Spotify.Player({name: '...'}),
//   spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr'
// })
