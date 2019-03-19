import React, {Component} from 'react'
import {getAccessToken} from '../store/spotify'
import socket from '../socket'

window.onSpotifyWebPlaybackSDKReady = () => {
  window.player = new Spotify.Player({
    //User token
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: async callback => {
      const token = await getAccessToken()
      callback(token)
    }
  })
  // Connect to the player!
  window.player.connect()

  window.player.addListener('player_state_changed', state => {
    //emits the state object to the server
    console.log(state)
    socket.emit('playbackState', {
      playbackState: state
    })
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
    socket.on('playbackStateFromServer', function(data) {
      console.log('from server', data)
    })
    return (
      <div>
        HELLO WORLD
        {/* <button onClick={this.getAccessToken}>Refresh Token</button> */}
      </div>
    )
  }
}
