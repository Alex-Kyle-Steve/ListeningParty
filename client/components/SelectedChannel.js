import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardDeck,
  Button
} from 'react-bootstrap'
import Playlist from './Playlist'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
import {fetchSelectedChannel, startListening, stopListening} from '../store'
import {ConnectedFavoriteChannels} from './FavoriteChannels'
import {ConnectedOwnedChannels} from './OwnedChannels'
import {ConnectedMessages} from './MessageList'
import {ConnectedAllChannelsSidebar} from './AllChannelsSidebar'
import socket from '../socket'
import {Player} from './Player'
import {addFavoriteChannel} from '../store/user'

export class SelectedChannel extends Component {
  componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    // join room when first render
    socket.emit('join-room', channelId)
    this.props.fetchSelectedChannel(channelId)
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
              <Player
                selectedChannel={selectedChannel}
                user={this.props.user}
                isListening={this.props.isListening}
                startListening={this.props.startListening}
                stopListening={this.props.stopListening}
              />

              {/* //////////////////////////////////////////////////////////////////////// */}

              <Row>
                <Card border="light" />
                <Tabs defaultActiveKey="playlist" id="music-tables-tabs">
                  <Tab eventKey="playlist" title="Playlist">
                    <Playlist playlist={this.props.playlist} />
                  </Tab>
                  <Tab eventKey="search" title="Search">
                    <ConnectedSpotifyCatalogSearch />
                  </Tab>
                </Tabs>
              </Row>
            </Col>
            {/* Chat/Channel Information tabs. */}

            {/* ////////////////////////////////////////////////////////////////////////// */}

            <Col xs={3}>
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
                        <Button
                          size="sm"
                          variant="link"
                          onClick={this.handleClick}
                        >
                          Add To Favorites
                        </Button>
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
    messages: state.message.messages,
    user: state.user,
    // playerState
    isListening: state.playerState.isListening,
    playlist: state.playerState.playlist
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelId =>
      dispatch(fetchSelectedChannel(channelId)),
    startListening: () => dispatch(startListening()),
    stopListening: () => dispatch(stopListening()),
    addFavoriteChannel: (userId, channelId) =>
      dispatch(addFavoriteChannel(userId, channelId))
  }
}

export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
