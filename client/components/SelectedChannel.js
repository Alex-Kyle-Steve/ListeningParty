import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Image,
  Modal,
  Popover,
  Jumbotron
} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
import {fetchSelectedChannel} from '../store/channel'

export class SelectedChannel extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    await this.props.fetchSelectedChannel(channelId)
  }

  render() {
    const selectedChannel = this.props.selectedChannel
    const historicalPlayList = selectedChannel.historicalPlayLists
    console.log(historicalPlayList)
    return (
      <Container>
        <Row>
          <Col xs={6}>
            <Card>
              <Card.Img src="/300x300.png" />
            </Card>
          </Col>
          <Col xs={6}>
            <Card.Title>Song Information:</Card.Title>
            <Card.Text>Title</Card.Text>
            <Card.Text>Artist </Card.Text>
            <Card.Text>Album</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <ConnectedSpotifyCatalogSearch />
          </Col>
          <Col xs={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Song</th>
                  <th>Album</th>
                </tr>
              </thead>
              <tbody>
                {historicalPlayList && historicalPlayList.length ? (
                  historicalPlayList.map(song => (
                    <tr key={song.song.id}>
                      <td>{song.song.artist}</td>
                      <td>{song.song.title}</td>
                      <td>{song.song.album}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td />
                    <td> No historical play list</td>
                    <td />
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelId => dispatch(fetchSelectedChannel(channelId))
  }
}
const mapStateToProps = state => {
  return {
    selectedChannel: state.channel.selectedChannel
  }
}
export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
