import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import {TrackScrollTable} from './TrackScrollTable'
import {changePlaylist} from '../store'

export class Playlist extends React.Component {
  constructor() {
    super()
    this.renderQueue = this.renderQueue.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  handleNext(idx) {
    const oldList = this.props.playlist
    const newList = [oldList[idx], ...oldList.slice(0, idx), ...oldList.slice(idx + 1)]
    const channelId = this.props.channelId
    this.props.changePlaylist(channelId, newList)
  }

  handleRemove(idx) {
    const oldList = this.props.playlist
    const newList = [...oldList.slice(0, idx), ...oldList.slice(idx + 1)]
    const channelId = this.props.channelId
    this.props.changePlaylist(channelId, newList)
  }

  renderQueue(...args) {
    const idx = args[3]
    return (
      <div className="container">
        <Button
          variant="primary"
          onClick={() => {
            this.handleNext(idx)
          }}
        >
          Next
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            this.handleRemove(idx)
          }}
        >
          Remove
        </Button>
      </div>
    )
  }
  render() {
    return <TrackScrollTable tracks={this.props.playlist} dataFormat={this.renderQueue} />
  }
}

const mapDispatch = dispatch => ({
  changePlaylist: (channelId, newList) => dispatch(changePlaylist(channelId, newList))
})

export default connect(null, mapDispatch)(Playlist)
