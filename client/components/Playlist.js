import React from 'react'
import {Button} from 'react-bootstrap'

class ChannelPlaylist extends React.Component {
  renderQueue() {
    return (
      <div className="container">
        <Button
          variant="primary"
          onClick={() => {
            playNow(song)
          }}
        >
          Add
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            makeFirst(song)
          }}
        >
          Add
        </Button>
      </div>
    )
  }
}
