import React from 'react'
import {Button} from 'react-bootstrap'
import {TrackScrollTable} from './TrackScrollTable'

export class Playlist extends React.Component {
  renderQueue(_, song) {
    return (
      <div className="container">
        <Button variant="primary" onClick={() => {}}>
          Next
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Remove
        </Button>
      </div>
    )
  }
  render() {
    return <TrackScrollTable tracks={this.props.playlist} dataFormat={this.renderQueue} />
  }
}
