import React, {Component} from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import {ConnectedController, ListenerController} from '.'

export class Player extends Component {
  constructor() {
    super()
    this.state = {
      toggleListening: false
    }
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
                  <Card.Title className="player-track-info-text-header">
                    <strong>Current Song</strong>
                  </Card.Title>
                </Col>

                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Title: Road Head
                  </Card.Text>
                </Col>
                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Artist: Japanese Breakfast
                  </Card.Text>
                </Col>
                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Album: Soft Sounds from Another Planet
                  </Card.Text>
                  {selectedChannel.ownerId !== user.id &&
                  isListening === false ? (
                    this.state.toggleListening === false ? (
                      <Button
                        variant="link"
                        onClick={() =>
                          this.setState({
                            toggleListening: true
                          })
                        }
                      >
                        {' '}
                        Start Listening{' '}
                      </Button>
                    ) : (
                      <div>
                        <Button
                          variant="link"
                          onClick={() =>
                            this.setState({
                              toggleListening: false
                            })
                          }
                        >
                          Stop Listening{' '}
                        </Button>
                        <ListenerController
                          isListening={isListening}
                          //TODO:
                          //Pass isPaused as props
                        />
                      </div>
                    )
                  ) : selectedChannel.ownerId === user.id ? (
                    <Row>
                      <ConnectedController
                        user={user}
                        selectedChannel={selectedChannel}
                        //pass isPaused as props
                      />
                    </Row>
                  ) : (
                    ''
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
