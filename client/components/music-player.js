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
    return <div>HELLO WORLD</div>
  }
}
