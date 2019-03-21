import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'

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
      console.log(res.data)
      this.setState({
        res: res.data
      })
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
    console.log(this.props.user)
    return (
      <Container>
        {/* <Row> */}
        {/* <Col xs="3" /> */}
        <Col xs={12}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="SearchCatalog">
              <Form.Label>
                <h1>Search the Spotify Catalog</h1>
              </Form.Label>
              <Form.Control
                onChange={this.handleChange}
                name="search"
                type="search"
                placeholder="Ex. Someday"
              />
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
        {/* <Col xs="3" /> */}
        {/* </Row> */}
        <Row>
          <Col>
            {this.state.res.tracks ? (
              <div>
                <h2>Search Results</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Artist</th>
                      <th>Song</th>
                      <th>Album</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.res.tracks.items.map(item => {
                      return (
                        <tr key={item.id}>
                          <td>{item.artists[0].name}</td>
                          <td>{item.name}</td>
                          <td>{item.album.name}</td>
                          <td style={{display: 'none'}}>{item.href}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
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
const mapDispatchToProps = dispatch => {
  return {}
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export const ConnectedSpotifyCatalogSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpotifyCatalogSearch)
