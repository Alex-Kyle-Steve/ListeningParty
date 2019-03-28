import React from 'react'
import {Card} from 'react-bootstrap'

export const CurrentSongInfo = function(props) {
  return (
    <div className="container">
      <Card.Title className="player-track-info-text-header">
        <strong>Current Song</strong>
      </Card.Title>
      <hr />
      <Card.Text className="player-track-info-text">
        Title:{' '}
        {props.currentTrack && props.currentTrack.name
          ? props.currentTrack.name
          : ''}
      </Card.Text>
      <hr />
      <Card.Text className="player-track-info-text">
        Artist:{' '}
        {props.currentTrack && props.currentTrack.artists[0].name
          ? props.currentTrack.artists[0].name
          : ''}
      </Card.Text>
      <hr />
      <Card.Text className="player-track-info-text">
        Album:{' '}
        {props.currentTrack && props.artists[0].name
          ? props.currentTrack.album.name
          : ''}
      </Card.Text>
    </div>
  )
}
