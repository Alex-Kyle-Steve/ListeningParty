import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import axios from 'axios'
import io from 'socket.io-client'
import socket from '../socket'

export class FavoriteChannels extends Component {
  constructor() {
    super()
    this.state = {
      favorites: []
    }
  }

  componentDidMount() {}

  render() {
    return <div>HELLO WORLD</div>
  }
}
