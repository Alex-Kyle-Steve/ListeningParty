import React, {Component} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import axios from 'axios'
import socket from '../socket'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
export class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {}
  }

  handleScriptLoad() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token =
        'BQCyK8SSju9-C1yFMihbWmLm7gTjESskH0uzL-5RrpZ5lfQqyg2-CY_DyxY89-iMK2lrBJBpDFQsFEb3h1Nb2GEIQiyGHercsW72revDNxRmmxf09qFK3z4A_AM0k-N4jJnD-JUKaf5oQWy-Cqetfzmpr1Lt9I03CUyzaZkTcOgig2sZSQZS6Z5fi8YTHlRNIy6fuYnSY6lTP841DMjtac-Wp50a6kjRMZS3NvA'
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

      player.addListener('player_state_changed', state => {
        //emits the state object to the server
        console.log(state)
        socket.emit('playbackState', {
          playbackState: state
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
    socket.on('playbackStateFromServer', function(data) {
      console.log('from server', data)
      //Load current Song data onto State
      // this.state = {
      //   currentTrackId: data.playbackState.track_window.current_track.id,
      //   currentTrackURI: data.playbackState.track_window.current_track.uri,
      //   currentTrackName: data.playbackState.track_window.current_track.name,
      //   currentTrackArtists:
      //     data.playbackState.track_window.current_track.artists[0],
      //   currentTrackAlbum:
      //     data.playbackState.track_window.current_track.album.name,
      //   currentTrackAlbumArt:
      //     data.playbackState.track_window.current_track.album.images[0]
      // }
      console.log('this.state from socket', this.state)
    })
    console.log('state in render', this.state)
    return (
      <div>
        <Container>
          <Row>
            <Col>
              {this.state.currentTrackAlbumArt === undefined ? (
                <img src="https://i.scdn.co/image/2c2087573a1c07cb454506ed61399e25936da8b6" />
              ) : (
                <img src={`${this.state.currentTrackAlbumArt}`} />
              )}
            </Col>
            <Col>
              Current Song:
              {this.state.currentTrackName === undefined
                ? ` No Song Loaded!`
                : ` ${this.state.currentTrackName}`}
              Artist:
              {this.state.currentTrackArtists === undefined
                ? ` No Song Loaded!`
                : ` ${this.state.currentTrackArtists.name}`}
            </Col>
            <Col>
              Album:{' '}
              {this.state.currentTrackArtists === undefined
                ? ` No Song Loaded!`
                : ` ${this.state.currentTrackArtists.name}`}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
