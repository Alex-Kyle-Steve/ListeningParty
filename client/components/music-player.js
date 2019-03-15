import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'

const accessToken =
  'BQD6xCDb395NYhLPH9s7Wvhy9hiY2cf4mcVhElyViCcS9DNSDRyeJcA4lQdum_L17YdZbJJdgeEQxGrXn3s1uoft4Gt_BCAgjimZPPHMdgzKheJ_MQRSLhtPikTK83RtERIEOYd54XG-VzWfP-HzNyWizQIr7XzOEyG-RDn4RsIFcXQrsqShTQLX_bQlnOtx4DhqsennnrO9hl7tnel5KKR68g'
const tempHeader = {
  'Authorization': 'Bearer ' + accessToken,
  'Content-Type': 'application/x-www-form-urlencoded'
}
export class MusicPlayer extends Component {
  constructor() {
    super()
    this.state = {
      track: {}
    }
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,playlist,artist,track`,
      headers: tempHeader
    })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        HELLO WORLD
        {this.state.track}
      </div>
    )
  }
}

export default MusicPlayer
