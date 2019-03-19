import React, {Component} from 'react'
import {connect} from 'react-redux'

import axios from 'axios'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'

class Discover extends Component {
  constructor() {
    super()
    this.state = {
      query: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${this.state.query}&type=track`,
      headers: {
        'Authorization': 'Bearer '
      }
    }).then(res => {
      console.log(res.data)
      return res.data
    })
  }
  handleChange(event) {
    this.setState({
      query: event.target.value
    })
    console.log('state', this.state.query)
    console.log(event.target.value)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="3" />
          <Col xs="6">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="SearchCatalog">
                <Form.Label>
                  <h1>Search the Spotify Catalog</h1>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange}
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
