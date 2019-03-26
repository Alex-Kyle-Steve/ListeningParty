import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {playTrack, togglePause, seekTrack} from '../store/player'
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

  togglePlay() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
    playTrack()
  }

  togglePause() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
    togglePause()
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
    seekTrack()
    // await axios({
    //   method: 'put',
    //   url: 'https://api.spotify.com/v1/me/player/seek?position_ms=6000',
    //   headers: {
    //     Authorization: `Bearer ${this.props.user.accessToken}`
    //   }
    //   // TODO: show position in MS
    // })
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
            onMouseUp={this.seekTrack}
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

const mapDisPatchToProps = dispatch => {
  return {
    togglePlay: dispatch(playTrack(this.props.currentTrack))
  }
}

export const ConnectedController = connect(mapStateToProps, null)(Controller)
