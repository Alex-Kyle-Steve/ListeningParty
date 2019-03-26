import React, {Component} from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import {ConnectedController} from '.'

export class Player extends Component {
  constructor() {
    super()
    this.state = {
      listening: false
    }

    this.toggleListening = this.toggleListening.bind(this)
  }

  toggleListening() {
    //TODO:
    //Plug in logic to actually "join" the channel
    this.setState({
      listening: !this.state.listening
    })
  }

  render() {
    const selectedChannel = this.props.selectedChannel
    const user = this.props.user
    const isListening = this.props.isListening
    return (
      <div>
        <Card border="light">
          <Row>
            <Col xs={6}>
              <Card.Img src="https://i.scdn.co/image/2b2c35974280d813521f8e9b5962f043136d3440" />
            </Col>
            <Col xs={6}>
              {/* Current Song Information */}
              <Row>
                <Col xs={12}>
                  <Card.Title>Song Information</Card.Title>
                </Col>
                <Col xs={12}>
                  <Card.Text>Road Head</Card.Text>
                </Col>
                <Col xs={12}>
                  <Card.Text>Japanese Breakfast</Card.Text>
                </Col>
                <Col xs={12}>
                  <Card.Text>Soft Sounds from Another Planet</Card.Text>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                {selectedChannel.ownerId !== user.id &&
                isListening === false ? (
                  <Row>
                    <Button variant="link" onClick={this.props.startListening}>
                      Start Listening
                    </Button>
                  </Row>
                ) : selectedChannel.ownerId === user.id ? (
                  <ConnectedController
                    user={user}
                    // togglePlay={() => this.togglePlay}
                  />
                ) : (
                  <Row>
                    <Button variant="link" onClick={this.props.stopListening}>
                      Stop Listening
                    </Button>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
