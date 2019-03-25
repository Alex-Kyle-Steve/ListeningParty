import React, {Component} from 'react'
import {
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardDeck,
  Button
} from 'react-bootstrap'
export class Player extends Component {
  constructor() {
    super()
    this.state = {
      togglePlay: false
    }
    this.togglePlayButton = this.togglePlayButton.bind(this)
  }

  togglePlayButton() {
    this.setState({
      togglePlay: !this.state.togglePlay
    })
  }

  render() {
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
                  <Card.Title>Song Information</Card.Title>
                </Col>
                <Col xs={12}>
                  <Card.Text>Road Head</Card.Text>
                </Col>
                <Col xs={12}>
                  <Card.Text>Japanese Breakfast</Card.Text>
                </Col>
                <Col xs={12}>
                  <Card.Text>Soft Sounds from Another Planet</Card.Text>
                </Col>
              </Row>
              <Row>
                <div id="player-container">
                  <div id="player-controls">
                    <div className="row center">
                      <i className="fa fa-step-backward">
                        <img src="/back.png" />
                      </i>
                      {this.state.togglePlay === false ? (
                        <i
                          onClick={this.togglePlayButton}
                          className="fa fa-pause-circle"
                        >
                          <img src="/play.png" />
                        </i>
                      ) : (
                        <i
                          onClick={this.togglePlayButton}
                          className="fa fa-pause-circle"
                        >
                          <img src="/pause.png" />
                        </i>
                      )}

                      <i className="fa fa-step-forward">
                        <img src="/forward.png" />
                      </i>
                    </div>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
