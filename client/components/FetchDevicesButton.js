import {Card, Button} from 'react-bootstrap'
import React from 'react'

export const FetchDevices = () => {
  return (
    <Card.Text>
      <Button
      //TODO: create click handler to hit https://api.spotify.com/v1/me/player/devices
      //And then map through in a drop down so that it hits https://developer.spotify.com/documentation/web-api/reference/player/transfer-a-users-playback/
      // for the appropriate device
      // onClick={this.handleClick}
      >
        Fetch Available Devices
      </Button>
    </Card.Text>
  )
}
