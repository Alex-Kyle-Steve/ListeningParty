import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'

const accessToken =
  'BQD6xCDb395NYhLPH9s7Wvhy9hiY2cf4mcVhElyViCcS9DNSDRyeJcA4lQdum_L17YdZbJJdgeEQxGrXn3s1uoft4Gt_BCAgjimZPPHMdgzKheJ_MQRSLhtPikTK83RtERIEOYd54XG-VzWfP-HzNyWizQIr7XzOEyG-RDn4RsIFcXQrsqShTQLX_bQlnOtx4DhqsennnrO9hl7tnel5KKR68g'
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
      track: {}
    }
  }

  getAccessToken() {
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: refreshHeader
    })
      .then(res => {
        console.log(res)
        console.log('SUCESS')
      })
      .catch(error => {
        console.log(error)
      })
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
        <button onClick={this.getAccessToken}>Refresh Token</button>
      </div>
    )
  }
}

export default MusicPlayer
