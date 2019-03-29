import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {playNextTrack, changePosition, scrollPosition} from '../store'

export class Controller extends Component {
  // handleChange(e) {
  //   const currVal = parseInt(e.target.value, 10)
  //   const max = parseInt(e.target.max, 10)
  //   if (currVal >= max - 2) this.props.playNextTrack()
  // }

  handleMouseUp(e) {
    const currentValue = e.target.value
    this.props.scrollPosition(currentValue)
  }

  render() {
    return (
      <Col xs={{span: 12}}>
        <br />
        <br />
        <Row>
          <Col
            xs={{offset: 0, span: 11}}
            md={{offset: 0, span: 10}}
            lg={{offset: 0, span: 12}}
            xl={{span: 12, offset: 5}}
          >
            {this.props.isPaused ? (
              <i
                onClick={
                  /** PLAY THUNK */
                  () => {}
                }
                className="fa fa-pause-circle"
              >
                <img src="/play.png" />
              </i>
            ) : (
              <i
                onClick={
                  /** PAUSE THUNK */
                  () => {}
                }
                className="fa fa-pause-circle"
              >
                <img src="/pause.png" />
              </i>
            )}
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            xs={{span: 11, offset: 0}}
            md={{span: 6}}
            lg={{span: 8, offset: 0}}
            xl={{span: 12, offset: 0}}
          >
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              defaultValue="0"
              className="slider"
              id="myRange"
              on
              onMouseUp={this.handleMouseUp.bind(this)}
            />
          </Col>
        </Row>
      </Col>
    )
  }
}

const mapDispatch = dispatch => ({
  playNextTrack: () => dispatch(playNextTrack()),
  scrollPosition: scrollVal => dispatch(scrollPosition(scrollVal))
})

export const PlayerController = connect(null, mapDispatch)(Controller)
