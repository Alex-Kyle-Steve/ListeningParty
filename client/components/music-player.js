import React, {Component} from 'react'
import {getAccessToken} from '../store/spotify'
import socket from '../socket'

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
  y
  // right now player is being created when user moves to MusicPlayer component
  // this is true for non-spotify user as well.
  // - TODO: fix to only instantiate when user is logged in with spotify
  componentDidMount() {
    window.player = new Spotify.Player({
      //User token
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: callback => getAccessToken().then(callback)
    })
    // Connect to the player!
    window.player.addListener('player_state_changed', state => {
      //emits the state object to the server
      socket.emit('new_playback_uri', state.track_window.current_track.uri)
    })
    window.player.connect()
  }

  render() {
    return <div>HELLO WORLD</div>
  }
}
