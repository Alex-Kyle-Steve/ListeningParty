import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ConnectedChannelSearch} from './channel-search'
import axios from 'axios'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'

class SingleChannel extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Container>
          {/* Left Side Bar */}
          <Row>
            <Col>
              <ConnectedChannelSearch />
            </Col>
          </Row>
          <Row>
            {/* Middle */}
            <Col />
          </Row>
          <Row>
            {/* Right Side Bar */}
            <Col />
          </Row>
        </Container>
      </div>
    )
  }
}

export const ConnectedSingleChannel = connect()(SingleChannel)
