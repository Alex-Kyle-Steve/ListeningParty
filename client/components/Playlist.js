import React from 'react'
import {connect} from 'redux'
import {playNextTrack} from '../store'

const mapDispatch = (dispatch, ownProps) => ({
  playNextTrack: dispatch(playNextTrack())
})
