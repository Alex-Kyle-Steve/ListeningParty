import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'

// const accessToken;
// const refreshToken;

const accessHeader = {
  Authorization:
    'Bearer ' +
    'BQCP8u8ePvKPiufuDtyFIYREzdlRKYIsQHyPYJIwrpw9oX2sgTE6vc_FmVcwrFuphBK8dwBdRmrfxH7TchIHSz6jCdYGh8iVodOAGP4Y5Cl8aaaxQJM620TMDjkowvw0kihJwQplNbH0WhgstsJJgxn0Vrt2wHE4kD_5Ruchbae3WzaUqiLK_5X2YdnFVHVSyrgFTlHqc9lZR_K_m0A6QB_0eZqphH4yIBWfr0zsZUPf8KocUoI',
  'Content-Type': 'application/x-www-form-urlencoded'
}

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

  handleScriptLoad() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = (window.player = new Spotify.Player({
        //User token
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token)
        }
      }))

      // Error handling
      player.addListener('initialization_error', ({message}) => {
        console.error(message)
      })
      player.addListener('authentication_error', ({message}) => {
        console.error(message)
      })
      player.addListener('account_error', ({message}) => {
        console.error(message)
      })
      player.addListener('playback_error', ({message}) => {
        console.error(message)
      })

      // Playback status updates
      player.addListener('player_state_changed', state => {
        console.log(state)
      })

      // Ready
      player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id)
      })

      // Not Ready
      player.addListener('not_ready', ({device_id}) => {
        console.log('Device ID has gone offline', device_id)
      })

      // Connect to the player!
      player.connect()
    }
  }

  componentDidMount() {
    this.handleScriptLoad()
  }
  render() {
    return (
      <div>
        <script defer src="https://sdk.scdn.co/spotify-player.js" />
        HELLO WORLD
        {/* <button onClick={this.getAccessToken}>Refresh Token</button> */}
      </div>
    )
  }
}
