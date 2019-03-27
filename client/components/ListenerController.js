import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

export class ListenerController extends Component {
  disable(event) {
    event.preventDefault()
  }

  render() {
    return (
      <Row>
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
      </Row>
    )
  }
}
