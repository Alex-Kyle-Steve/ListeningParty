import React, {Component} from 'react'
import {Row, Col, Button} from 'react-bootstrap'

export class ListenerController extends Component {
  disable(event) {
    event.preventDefault()
  }

  render() {
    return (
      <Row>
        {this.props.isListening ? (
          <Button variant="link" onClick={this.props.stopListening}>
            Stop Listening{' '}
          </Button>
        ) : (
          <Button variant="link" onClick={this.props.startListening}>
            Start Listening{' '}
          </Button>
        )}
        <Col xs={{offset: 4}}>
          {this.props.isPaused ? (
            //Renders the pause Button.
            //Condition is !Owner&&isPaused === true
            <i className="fa fa-pause-circle">
              <img src="/pause.png" />
            </i>
          ) : (
            //Renders the play button
            //Condition is !Owner&&isPaused === true
            <i className="fa fa-pause-circle">
              <img src="/play.png" />
            </i>
          )}
        </Col>
        <input
          type="range"
          min="0"
          max="1000"
          onMouseDown={this.disable}
          defaultValue={0}
          className="slider"
          id="myRange"
        />
      </Row>
    )
  }
}
