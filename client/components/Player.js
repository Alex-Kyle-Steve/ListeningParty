import React, {Component} from 'react'
import {Card, Row, Col, Button} from 'react-bootstrap'
import {Controller, ListenerController} from '.'

export class Player extends Component {
  render() {
    const isListening = this.props.isListening
    const isOwner = this.props.isOwner
    console.log(this.props)
    return (
      <div>
        <Card border="light">
          <Row>
            <Col xs={6}>
              <Card.Img
                src={
                  this.props.currentTrack
                    ? // .images[0] !== undefined
                      this.props.currentTrack.images[0]
                    : '/noAlbum.jpg'
                }
              />
            </Col>
            <Col xs={6}>
              {/* Current Song Information */}
              <Row>
                <Col xs={12} className="player-track-info-text-header">
                  <Card.Title className="player-track-info-text-header">
                    <strong>Current Song</strong>
                  </Card.Title>
                </Col>

                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Title:{' '}
                    {this.props.currentTrack && this.props.currentTrack.name
                      ? this.props.currentTrack.name
                      : ''}
                  </Card.Text>
                </Col>
                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Artist:{' '}
                    {this.props.currentTrack &&
                    this.props.currentTrack.artists[0].name
                      ? this.props.currentTrack.artists[0].name
                      : ''}
                  </Card.Text>
                </Col>
                <Col xs={12}>
                  <hr />
                  <Card.Text className="player-track-info-text">
                    Album:{' '}
                    {this.props.currentTrack && this.props.artists[0].name
                      ? this.props.currentTrack.album.name
                      : ''}
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
