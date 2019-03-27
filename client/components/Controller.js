import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col, Row} from 'react-bootstrap'
import {playTrack, togglePause, seekTrack} from '../store/player'
export class Controller extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false,
      sliderValue: 0
    }
  }

  render() {
    console.log(this.props)
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
            {this.state.togglePlay === false ? (
              <i
                onClick={() => {
                  this.setState({togglePlay: true})
                  this.props.togglePlay(false)
                }}
                className="fa fa-pause-circle"
              >
                <img src="/play.png" />
              </i>
            ) : (
              <i
                onClick={() => {
                  this.setState({togglePlay: false})
                  this.props.togglePlay(true)
                }}
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
              min="1"
              max="100"
              onMouseDown={this.disable}
              step="1"
              defaultValue="0"
              className="slider"
              id="myRange"
            />
            <button onClick={this.step}>Step</button>
          </Col>
        </Row>
      </Col>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTrack: state.currentTrack,
    playlist: state.playlist,
    player: state.player
  }
}

const mapDisPatchToProps = dispatch => {
  return {
    togglePlay: shouldPause => dispatch(togglePause(shouldPause))
  }
}

export const ConnectedController = connect(mapStateToProps, mapDisPatchToProps)(
  Controller
)
