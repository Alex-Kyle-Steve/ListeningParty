import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchSelectedSong} from '../store/song'

export class SelectedSong extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const songId = parseInt(this.props.match.params.songId)
    await this.props.fetchSelectedSong(songId)
  }

  render() {
    const selectedSong = this.props.selectedSong
    return (
      <div>
        <h3>Selected Song</h3>
        {selectedSong.title ? (
          <div>
            <h4>Song Title:</h4>
            <span>{selectedSong.title}</span>
            <h4>Artist:</h4>
            <span>{selectedSong.artist}</span>
            <h4>Album:</h4>
            <span>{selectedSong.album}</span>
            <h4>Year Released:</h4>
            <span>{selectedSong.releaseYear}</span>
            <h4>Song Length:</h4>
            <span>{selectedSong.length}</span>
          </div>
        ) : (
          'No valid song selected'
        )}
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedSong: songId => dispatch(fetchSelectedSong(songId))
  }
}
const mapStateToProps = state => {
  return {
    selectedSong: state.song
  }
}
export const ConnectedSelectedSong = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedSong)
