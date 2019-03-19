import React, {Component} from 'react'
import {getAccessToken} from '../store/spotify'
import socket from '../socket'

window.onSpotifyWebPlaybackSDKReady = () => {
  window.player = new Spotify.Player({
    //User token
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: callback => getAccessToken().then(callback)
  })
  // Connect to the player!
  window.player.connect()
  window.player.addListener('player_state_changed', state => {
    console.log(state)
    //emits the state object to the server
    socket.emit('new_playback_uri', state.track_window.current_track.uri)
  })
}
// ** change it to execute only when user logs-in

export class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      tracks: {},
      albums: [],
      playlists: [],
      artists: []
    }
  }

  render() {
    socket.on('recieve_new_uri', uri =>
      window.player.getCurrentState().then(state => {
        console.log('changing music')
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
          )
      })
    )
    return (
      <div>
        HELLO WORLD
        {/* <button onClick={this.getAccessToken}>Refresh Token</button> */}
      </div>
    )
  }
}
