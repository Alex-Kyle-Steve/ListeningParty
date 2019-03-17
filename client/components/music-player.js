import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'

// const accessToken;
// const refreshToken;

const accessHeader = {
  Authorization: 'Bearer ' + accessToken,
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

  // getAccessToken() {
  //   axios({
  //     method: 'post',
  //     url: 'https://accounts.spotify.com/api/token'
  //     // headers: refreshHeader
  //   })
  //     .then(res => {
  //       console.log(res)
  //       console.log('SUCCESS')
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

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
    // axios({
    //   method: 'get',
    //   url: `https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,playlist,artist,track`,
    //   headers: accessHeader
    // })
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({
    //       tracks: res.data.tracks.items,
    //       albums: res.data.albums.items,
    //       playlists: res.data.playlists.items,
    //       artists: res.data.artists.items
    //     })
    //     console.log(this.state)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
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
