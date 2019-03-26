import React from 'react'
import {Row, Col} from 'react-bootstrap'

export const Track = props => {
  const track = props.track
  return (
    <div className="container">
      <Row>
        <Col sm={8}>{track.title}</Col>
        <Col sm={2}>{track.album}</Col>
        <Col sm={2}>{track.artist}</Col>
      </Row>
    </div>
  )
}
