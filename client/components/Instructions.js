import React from 'react'
import {
  Popover,
  OverlayTrigger,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'

export function Instructions() {
  return (
    <OverlayTrigger
      trigger="click"
      key="left"
      placement="left"
      overlay={
        <Popover id={`popover-positioned-left}`} title="Instructions">
          <ListGroup variant="flush">
            <ListGroup.Item>
              1. Connect to 'Listening Party Spotify Player' with your device
              using the button Below
            </ListGroup.Item>
            <ListGroup.Item>2. Add songs to the cue</ListGroup.Item>
            <ListGroup.Item>3. Enjoy!</ListGroup.Item>
          </ListGroup>
        </Popover>
      }
    >
      <Button variant="primary">How to Connect</Button>
    </OverlayTrigger>
  )
}
