import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col, Tabs, Tab, CardDeck} from 'react-bootstrap'
import {ScrollTable} from './ScrollTable'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
import {fetchSelectedChannel} from '../store/channel'
import {ConnectedFavoriteChannels} from './FavoriteChannels'
import {ConnectedOwnedChannels} from './OwnedChannels'
import {ConnectedMessages} from './MessageList'
import {ConnectedAllChannelsSidebar} from './AllChannelsSidebar'
import socket from '../socket'
import {Player} from './Player'
export class SelectedChannel extends Component {
  constructor() {
    super()
  }
  async componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    socket.emit('join-room', channelId)
    await this.props.fetchSelectedChannel(channelId)
  }

  formatData() {
    return this.props.selectedChannel.historicalPlayLists.reduce(
      (accumulator, currentValue) => {
        accumulator.push(currentValue.song)
        return accumulator
      },
      []
    )
  }

  render() {
    const selectedChannel = this.props.selectedChannel
    const historicalPlayList = selectedChannel.historicalPlayLists
    const channelId = parseInt(this.props.match.params.channelId)
    return (
      <div>
        <Container fluid={true}>
          <Row>
            {/* Channel Bar */}
            <Col xs={3}>
              <ConnectedOwnedChannels channelId={channelId} />
              <ConnectedFavoriteChannels />
              <ConnectedAllChannelsSidebar />
            </Col>
            {/* Music info/Player */}
            <Col xs={6}>
              <Card border="light">
                <Row>
                  <Col xs={6}>
                    <Card.Img src="https://i.scdn.co/image/2b2c35974280d813521f8e9b5962f043136d3440" />
                  </Col>
                  <Col xs={6}>
                    <Row>
                      <Col xs={12}>
                        <Card.Title>Song Information</Card.Title>
                      </Col>
                      <Col xs={12}>
                        <Card.Text>Road Head</Card.Text>
                      </Col>
                      <Col xs={12}>
                        <Card.Text>Japanese Breakfast</Card.Text>
                      </Col>
                      <Col xs={12}>
                        <Card.Text>Soft Sounds from Another Planet</Card.Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Player />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Tabs defaultActiveKey="playlist" id="music-tables-tabs">
                  <Tab eventKey="playlist" title="Playlist">
                    {selectedChannel.description ? (
                      this.props.selectedChannel.historicalPlayLists !==
                      historicalPlayList ? (
                        <ScrollTable playList={historicalPlayList} />
                      ) : (
                        <ScrollTable playList={historicalPlayList} />
                      )
                    ) : (
                      ''
                    )}
                  </Tab>
                  <Tab eventKey="search" title="Search">
                    <ConnectedSpotifyCatalogSearch />
                  </Tab>
                </Tabs>
              </Row>
            </Col>

            {/* Chat */}
            <Col xs={3}>
              <ConnectedMessages />
              <Row>
                <Col xs={12}>
                  <CardDeck>
                    <Card border="light">
                      <Card.Body>
                        <Card.Title className="link-styling">
                          <h3>
                            Current Channel:
                            <br /> {selectedChannel.name}{' '}
                          </h3>
                        </Card.Title>

                        {/* </Link> */}

                        <Card.Text>{selectedChannel.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>CHAT HERRE</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
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
    selectedChannel: state.channel.selectedChannel,
    messages: state.message.messages
  }
}
export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
