import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col, Tabs, Tab, CardDeck} from 'react-bootstrap'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
import {
  fetchSelectedChannel,
  startListening,
  stopListening,
  fetchChannelPlaylist,
  playNextTrack
} from '../store'
import {ConnectedFavoriteChannels} from './FavoriteChannels'
import {ConnectedOwnedChannels} from './OwnedChannels'
import {ConnectedMessages} from './MessageList'
import {ConnectedAllChannelsSidebar} from './AllChannelsSidebar'
import socket from '../socket'
import {Player} from './Player'
import {addFavoriteChannel} from '../store/user'
import {TrackScrollTable} from './TrackScrollTable'

export class SelectedChannel extends Component {
  componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId, 10)
    // join room when first render
    socket.emit('join-room', channelId)
    this.props.fetchSelectedChannel(channelId)
    this.props.fetchPlaylist(channelId)
  }

  componentDidUpdate(prevProps) {
    // get previous and current channel ID
    const prevCh = prevProps.match.params.channelId
    const currCh = this.props.match.params.channelId
    // if channel changed
    if (prevCh !== currCh) {
      // leave previous room
      socket.emit('leave-room', prevCh)
      // join current room
      socket.emit('join-room', currCh)
      // get the new channel and set it on state as SelectedChannel
      this.props.fetchSelectedChannel(currCh)
      this.props.fetchPlaylist(currCh)
      // stop listening if you were listening before
      if (this.props.isListening) this.props.stopListening()
    }
  }

  componentWillUnmount() {
    const currCh = this.props.match.params.channelId
    socket.emit('leave-room', currCh)
  }

  render() {
    const selectedChannel = this.props.selectedChannel
    const channelId = parseInt(this.props.match.params.channelId, 10)
    const isOwner = this.props.selectedChannel.id === this.props.user.id
    return (
      <div>
        <Container fluid={true}>
          <Row>
            {/* Channel Bar */}
            <Col xs={12} s={12} md={3} l={3} lg={3}>
              <ConnectedOwnedChannels channelId={channelId} />
              <ConnectedFavoriteChannels />
              <ConnectedAllChannelsSidebar />
            </Col>
            {/* Music info/Player */}
            <Col xs={12} s={12} md={6} l={6} lg={6}>
              <Player
                currentTrack={this.props.currentTrack}
                selectedChannel={selectedChannel}
                isOwner={isOwner}
                isPaused={this.props.isPaused}
                isListening={this.props.isListening}
                startListening={this.props.startListening}
                stopListening={this.props.stopListening}
              />
              <Row>
                <Card border="light" />
                <Tabs defaultActiveKey="playlist" id="music-tables-tabs">
                  <Tab eventKey="playlist" title="Playlist">
                    <TrackScrollTable tracks={this.props.playlist} />
                  </Tab>
                  <Tab eventKey="search" title="Search">
                    <ConnectedSpotifyCatalogSearch />
                  </Tab>
                </Tabs>
              </Row>
            </Col>
            <Col xs={12} s={12} md={3} l={3} lg={3}>
              <Tabs
                defaultActiveKey="description"
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="description" title="Channel">
                  <CardDeck>
                    <Card border="light">
                      <Card.Body>
                        <Card.Title className="link-styling">
                          <h3>
                            Current Channel:
                            <br />
                            {selectedChannel.name}{' '}
                          </h3>
                        </Card.Title>
                        <Card.Text>{selectedChannel.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </CardDeck>
                </Tab>
                <Tab eventKey="chat" title="Chat" style={{maxHeight: '1000px'}}>
                  <ConnectedMessages channel={selectedChannel.name} />
                </Tab>
              </Tabs>
              <Row>
                <Col xs={12} />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedChannel: state.channel.selectedChannel,
    user: state.user,
    isPaused: state.playerState.isPaused,
    isListening: state.playerState.isListening,
    playlist: state.playerState.playlist,
    currentTrack: state.currentTrack
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelId =>
      dispatch(fetchSelectedChannel(channelId)),
    startListening: () => dispatch(startListening()),
    stopListening: () => dispatch(stopListening()),
    addFavoriteChannel: (userId, channelId) =>
      dispatch(addFavoriteChannel(userId, channelId)),
    fetchPlaylist: channelId => dispatch(fetchChannelPlaylist(channelId)),
    playNextTrack: () => dispatch(playNextTrack())
  }
}

export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
