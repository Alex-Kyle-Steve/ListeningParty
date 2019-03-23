import React from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardDeck,
  Button
} from 'react-bootstrap'
export const Player = props => {
  const progressBarStyles = {
    width: 3000 * 100 / 6000 + '%'
    // width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  }

  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__status">
            {props.is_playing ? 'Playing' : <Button> Pause </Button>}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    playerInstance: state.player.instance,
    currentTrack: state.currentTrack
  }
}

export const ConnectedPlayer = connect(mapState, null)(Player)
