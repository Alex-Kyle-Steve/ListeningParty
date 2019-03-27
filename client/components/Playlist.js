import React from 'react'
import {connect} from 'redux'
import {playNextTrack} from '../store'

class ChannelPlaylist extends React.Component {}

const mapDispatch = (dispatch, ownProps) => ({
  playNextTrack: dispatch(playNextTrack())
})
