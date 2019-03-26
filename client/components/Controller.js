import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
export class Controller extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false,
      sliderValue: 0
    }
    this.togglePlay = this.togglePlay.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.toggleSkip = this.toggleSkip.bind(this)
    this.togglePrev = this.togglePrev.bind(this)
    this.seekTrack = this.seekTrack.bind(this)
  }

  async togglePlay() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
    await axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${
        this.props.player._options.id
      }`,
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      },
      data: {
        uris: [
          'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
          'spotify:track:1301WleyT98MSxVHPZCA6M'
        ]
      }
    })
  }

  async togglePause() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
    await axios({
      method: 'put',
      url: `https://api.spotify.com/v1/me/player/pause`,
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
    })
  }

  async toggleSkip() {
    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/me/player/next`,
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
    })
  }

  async togglePrev() {
    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/me/player/previous`,
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
    })
  }

  async seekTrack() {
    await axios({
      method: 'put',
      url: 'https://api.spotify.com/v1/me/player/seek',
      headers: {
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
      // TODO: show position in MS
      // data:{
      //   position_ms:
      // }
    })
  }

  onInput(currentPosition, songLength) {
    //TODO:
    //Create function that increments the sliderValue as a function of the duration of the song.
    //Have dynamic scrubbing
  }
  //currentPosition and songLength are values in Milliseconds

  render() {
    console.log(this.props)
    return (
      <div id="player-container">
        <div id="player-controls">
          <div className="row right">
            <i onClick={this.togglePrev} className="fa fa-step-backward">
              <img src="/back.png" />
            </i>
            {this.state.togglePlay === false ? (
              <i onClick={this.togglePlay} className="fa fa-pause-circle">
                <img src="/play.png" />
              </i>
            ) : (
              <i onClick={this.togglePause} className="fa fa-pause-circle">
                <img src="/pause.png" />
              </i>
            )}
            <i onClick={this.toggleSkip} className="fa fa-step-forward">
              <img src="/forward.png" />
            </i>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            onInput={this.seekTrack}
            defaultValue={0}
            className="slider"
            id="myRange"
          />
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {}

const mapStateToProps = state => {
  return {
    currentTrack: state.currentTrack,
    playlist: state.playlist,
    player: state.player
  }
}

export const ConnectedController = connect(mapStateToProps, null)(Controller)
