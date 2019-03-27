import React, {Component} from 'react'
import {Col, Row} from 'react-bootstrap'
import {togglePause} from '../store'
export class Controller extends Component {
  render() {
    return (
      <Col xs={{span: 12}}>
        <br />
        <br />
        <Row>
          <Col
            xs={{offset: 1, span: 11}}
            md={{offset: 0, span: 12}}
            lg={{offset: 0, span: 12}}
            xl={{span: 12, offset: 4}}
          >
            <i onClick={this.togglePrev} className="fa fa-step-backward">
              <img src="/back.png" />
            </i>
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
            <i onClick={this.tthioggleSkip} className="fa fa-step-forward">
              <img src="/forward.png" />
            </i>
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
              onMouseDown={this.disable}
              step="1"
              defaultValue="0"
              className="slider"
              id="myRange"
            />
          </Col>
        </Row>
      </Col>
    )
  }
}
