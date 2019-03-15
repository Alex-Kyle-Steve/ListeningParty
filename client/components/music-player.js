import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'

const accessToken =
  'BQADUvezmfN3OH-8Vn-1DEt7D7idfmsaDT4L1PBwk14T2DKM3uPjlV6AXiHf7WKO_CV4A4qVrSlzfXBhHKmlTfbjHlYYMEi4QrvMT69dSOe9Wd1oJ1ypOdlWXnRzf4ef-AFhq1-x8L7SCrYl_ulipCRaNQGV7dT7Z2i1kFeqhdnKa4vufRkFYzZgAV4KSVQjmY4KV1OhRGb0gPxwqAWrvvWyCQ'
const refreshToken =
  'AQCaMExn5ArN4LxDyipCgM6S1Pvp0fkZHC9s_UqgZ9TrOwYIl0kwHH48VIzFq3zMI_JaDEChl_qA8zbWlhOXgLutWnIm2tN6CvNgH_H6Ody5boZ6d-xJpWXLdmkYo9w2oy9ZsA'
const accessHeader = {
  'Authorization': 'Bearer ' + accessToken,
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
      const token =
        'BQDrw159syJWnyyyf41KQlq6kEJ35s1gUsV_r8RMuzaLk7gOGeusYPxWI3HHWRa4IrfCdx_g_eKIX0MgtBgDAe5QkxV1y4WSJlgqJEYOMGZNxmn7NIpq4ngnC0yae3Ykg3ycEX7MBHP7XNlbBb1ESpQ3IIQtyPgpGSmRY7YR3lly'
      window.player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
          cb(token)
        }
      })

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
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,playlist,artist,track`,
      headers: accessHeader
    })
      .then(res => {
        console.log(res.data)
        this.setState({
          tracks: res.data.tracks.items,
          albums: res.data.albums.items,
          playlists: res.data.playlists.items,
          artists: res.data.artists.items
        })
        console.log(this.state)
      })
      .catch(error => {
        console.log(error)
      })
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
