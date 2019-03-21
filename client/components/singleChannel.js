import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
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
              <ConnectedSpotifyCatalogSearch />
            </Col>
            {/* Middle */}
            <Col />
            {/* Right Side Bar */}
            <Col />
          </Row>
        </Container>
      </div>
    )
  }
}

export const ConnectedSingleChannel = connect()(SingleChannel)
