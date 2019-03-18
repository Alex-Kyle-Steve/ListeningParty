import React, {Component} from 'react'
import {getAccessToken} from '../store/spotify'

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
