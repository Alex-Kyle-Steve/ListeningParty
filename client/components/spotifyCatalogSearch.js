import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button, Row, Col, Form, Container} from 'react-bootstrap'
import {TrackScrollTable} from './TrackScrollTable'
import {addNewTrack} from '../store'
import socket from '../socket'

class SpotifyCatalogSearch extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      res: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderButton = this.renderButton.bind(this)
    this.requestButton = this.requestButton.bind(this)
  }

  formatData(trackItems) {
    return trackItems.reduce((accumulator, currentValue) => {
      accumulator.push({
        album: currentValue.album.name,
        artist: currentValue.album.artists[0].name,
        title: currentValue.name,
        uri: currentValue.uri
      })
      return accumulator
    }, [])
  }

  //Adds an "Add" Button to the table
  renderButton(_, song) {
    const addTrack = this.props.addTrack
    return (
      <Button
        variant="primary"
        onClick={() => {
          addTrack(song)
        }}
      >
        Add
      </Button>
    )
  }
  requestButton(_, song) {
    return (
      <Button
        variant="primary"
        onClick={() => {
          this.requestTrack(song)
        }}
      >
        Request
      </Button>
    )
  }
  requestTrack(song) {
    socket.emit('request', song, this.props.user, this.props.selectedChannel.id)
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
    const trackItems = this.state.res.tracks && this.state.res.tracks.items
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
                {this.props.selectedChannel.ownerId === this.props.user.id ? (
                  <TrackScrollTable
                    tracks={this.formatData(trackItems)}
                    dataFormat={this.renderButton}
                  />
                ) : (
                  <TrackScrollTable
                    tracks={this.formatData(trackItems)}
                    dataFormat={this.requestButton}
                  />
                )}
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
    user: state.user,
    selectedChannel: state.channel.selectedChannel
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addTrack: trackData => dispatch(addNewTrack(trackData))
  }
}
export const ConnectedSpotifyCatalogSearch = connect(mapStateToProps, mapDispatchToProps)(
  SpotifyCatalogSearch
)
