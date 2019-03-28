import React, {Component} from 'react'
import {Card, Row, Col} from 'react-bootstrap'
import {PlayerController, ListenerController} from '.'
import {CurrentSongInfo} from './CurrentSongInfo'

export class Player extends Component {
  render() {
    const isOwner = this.props.isOwner
    return (
      <div>
        <Card border="light">
          <Row>
            <Col xs={6}>
              <Card.Img
                src={
                  this.props.currentTrack
                    ? this.props.currentTrack.images[0]
                    : '/noAlbum.jpg'
                }
              />
            </Col>
            <Col xs={6}>
              {/* Current Song Information */}
              <CurrentSongInfo currentTrack={this.props.currentTrack} />
              <hr />
              {isOwner ? (
                <PlayerController isPaused={this.props.isPaused} />
              ) : (
                <ListenerController
                  stopListening={this.props.stopListening}
                  startListening={this.props.startListening}
                  isListening={this.props.isListening}
                  isPaused={this.props.isPaused}
                />
              )}
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
