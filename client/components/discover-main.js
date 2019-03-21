import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'

class Discover extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col xs="6">
            <Form>
              <Form.Group controlId="SearchCatalog">
                <Form.Label>
                  <h1>Search the Spotify Catalog</h1>
                </Form.Label>
                <Form.Control
                  name="search"
                  type="search"
                  placeholder="Ex. The Beatles"
                />
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs="3" />
        </Row>
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => {}
const mapStateToProps = () => {}
export const ConnectedDiscover = connect(mapDispatchToProps, mapStateToProps)(
  Discover
)
