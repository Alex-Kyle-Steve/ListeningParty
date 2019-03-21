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
            <Row>
              <Col xs={12}>
                <Card.Title>
                  <h3>Song Information</h3>
                </Card.Title>
              </Col>
              <Col xs={12}>
                <Card.Text>
                  <h4>Title</h4>
                </Card.Text>
              </Col>
              <Col xs={12}>
                <Card.Text>
                  <h4>Artist </h4>
                </Card.Text>
              </Col>
              <Col xs={12}>
                <Card.Text>
                  <h4>Album</h4>
                </Card.Text>
              </Col>
            </Row>
            <Row>
              {/* <div>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Artist</th>
                      <th>Song</th>
                      <th>Album</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalPlayList ? (
                      historicalPlayList.map(song => {
                        return (
                          <tr key={song.id}>
                            <td>{song.song.artist}</td>
                            <td>{song.song.title}</td>
                            <td>{song.song.album}</td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr />
                    )}
                  </tbody>
                </Table>
              </div> */}
            </Row>
          </Col>
        </Row>
        <Row>
          <ConnectedSpotifyCatalogSearch />

          {/* <Col xs={6}>

          </Col> */}
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
