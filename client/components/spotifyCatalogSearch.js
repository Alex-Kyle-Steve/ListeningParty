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
        Authorization:
          'Bearer BQBE6FXalK6a3qVL13SaFZmcYav0-exeBq_pj5qNFLG5YHe7mpvqaXM50Cwqkj0V8sE_UfrRCUgNJj_UD8doOAbXfxU-ooQO0h6l9V8uk-rY734WPF84v89PFYaFLpXL0EblHGYomyRF2HgcNw2kqkP9P_fs47KGNR3EdHed5BDBkP_GF-vnQSzI9JMsp8E6mk0Y7DyXq9Nt8OqzlxCof6iGh04PZVQMlfvDMH0'
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
                  placeholder="Ex. Someday"
                />
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs="3" />
        </Row>
        <Row>
          <Col>
            <div>
              {this.state.res.tracks ? (
                <img src={this.state.res.tracks.items[0].album.images[0].url} />
              ) : (
                ''
              )}
              <br />
              <br />

              {this.state.res.tracks ? (
                <h2>Current Song: {this.state.res.tracks.items[0].name}</h2>
              ) : (
                <h1>Search for a Song Above!</h1>
              )}
              {this.state.res.tracks ? (
                <h2>
                  Artist: {this.state.res.tracks.items[0].artists[0].name}
                </h2>
              ) : (
                ''
              )}
              <br />
              {this.state.res.tracks ? (
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
              ) : (
                ''
              )}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => {}
const mapStateToProps = () => {}
export const ConnectedSpotifyCatalogSearch = connect(
  mapDispatchToProps,
  mapStateToProps
)(SpotifyCatalogSearch)
