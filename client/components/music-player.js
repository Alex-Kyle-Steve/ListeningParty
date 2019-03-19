import React, {Component} from 'react'
import {getAccessToken} from '../store/spotify'
import socket from '../socket'
// ** change it to execute only when user logs-in

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
      console.log(state)
      //emits the state object to the server
      socket.emit('new_playback_uri', state.track_window.current_track.uri)
    })
    window.player.connect()
  }

  render() {
    return <div>HELLO WORLD</div>
  }
}
