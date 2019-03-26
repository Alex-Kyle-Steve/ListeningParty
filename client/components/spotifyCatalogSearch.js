import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
import {SpotifyCatalogScrollTable} from './SpotifyCatalogScrollTable'
class SpotifyCatalogSearch extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      res: {}
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
        Authorization: `Bearer ${this.props.user.accessToken}`
      }
    }).then(res => {
      this.setState({
        res: res.data
      })
    })
  }
  handleChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="SearchCatalog">
                <Form.Label>
                  <h5>Search Spotify</h5>
                </Form.Label>
                <Form.Control
                  onChange={this.handleChange}
                  name="search"
                  type="search"
                  placeholder="Artist, Album, or Song"
                  size="lg"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.res.tracks ? (
              <div>
                <h5>Search Results</h5>
                <SpotifyCatalogScrollTable tracks={this.state.res.tracks} />
              </div>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}
export const ConnectedSpotifyCatalogSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyCatalogSearch)
