import React, {Component} from 'react'
import {Row, Col} from 'react-bootstrap'

export class ListenerController extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false
    }
  }

  step() {
    const slider = document.getElementById('myRange')
    slider.stepUp('1')
  }

  disable(event) {
    event.preventDefault()
  }

  step() {
    const slider = document.getElementById('myRange')
    slider.stepUp('1')
  }

  disable(event) {
    event.preventDefault()
  }

  render() {
    return (
      <Row>
        <Col xs={{offset: 5}}>
          {this.state.togglePlay === false ? (
            //Renders the pause Button.
            //Condition is !Owner&&isPaused === true
            <i
              onClick={() => {
                this.setState({togglePlay: true})
                // this.props.startListening()
                setInterval(this.step, 1000)
              }}
              className="fa fa-pause-circle"
            >
              <img src="/pause.png" />
            </i>
          ) : (
            //Renders the play button
            //Condition is !Owner&&isPaused === true
            <i
              onClick={() => {
                this.setState({togglePlay: false})
                // this.props.startListening()
                // setInterval(this.step, 1000)
              }}
              className="fa fa-pause-circle"
            >
              <img src="/play.png" />
            </i>
          )}
        </Col>
        <input
          type="range"
          min="1"
          max="100"
          onMouseDown={this.disable}
          defaultValue={0}
          className="slider"
          id="myRange"
        />
      </Row>
    )
  }
}
