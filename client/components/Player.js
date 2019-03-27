import React, {Component} from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import {Controller, ListenerController} from '.'

export class Player extends Component {
  render() {
    const isListening = this.props.isListening
    const isOwner = this.props.isOwner
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
                  {!isOwner ? (
                    <Row>
                      <Controller isPaused={this.props.isPaused} />
                    </Row>
                  ) : !isListening ? (
                    <Button variant="link" onClick={this.props.startListening}>
                      {' '}
                      Start Listening{' '}
                    </Button>
                  ) : (
                    <div>
                      <Button variant="link" onClick={this.props.stopListening}>
                        Stop Listening{' '}
                      </Button>
                      <ListenerController isPaused={this.props.isPaused} />
                    </div>
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
