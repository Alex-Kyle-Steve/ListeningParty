import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'
import io from 'socket.io-client'
import socket from '../socket'
// const accessToken =
//   'BQBO2yKWgxJ73T5X3Pk5gfcX4HHk4-HT67WlpAKfKphBHlZUysd07FuNyHiIYZ32uGO10no0DhQpifgBSfoZ8Gtt6Ng9yXRYA6Sr3Y_mo1cCk43ITd3xmF2ZqIR456U6zWWhJFux7o3UtgV_dySkEUOisIgmdvEzLjzu3ExYGdMv'
// const refreshToken =
//   'AQCaMExn5ArN4LxDyipCgM6S1Pvp0fkZHC9s_UqgZ9TrOwYIl0kwHH48VIzFq3zMI_JaDEChl_qA8zbWlhOXgLutWnIm2tN6CvNgH_H6Ody5boZ6d-xJpWXLdmkYo9w2oy9ZsA'
// const accessHeader = {
//   Authorization: 'Bearer ' + accessToken,
//   'Content-Type': 'application/x-www-form-urlencoded'
// }

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

      player.addListener('player_state_changed', state => {
        //emits the state object to the server
        console.log(state)
        socket.emit('playbackState', {
          playbackState: state
        })
        socket.on('playbackStateFromServer', function(data) {
          console.log('from server', data)
        })
        // console.log('state', state)
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
        HELLO WORLD
        {/* <button onClick={this.getAccessToken}>Refresh Token</button> */}
      </div>
    )
  }
}
