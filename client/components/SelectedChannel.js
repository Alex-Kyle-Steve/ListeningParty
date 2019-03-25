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
    this.state = {
      joined: false
    }
    this.joinChannel = this.joinChannel.bind(this)
  }
  async componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    socket.emit('join-room', channelId)
    await this.props.fetchSelectedChannel(channelId)
  }
  //TODO:
  //Create componentDidUpdate(){} hook in order to update the table

  // Formats data to pass as props to the playlist table. Needs to be an array of objects in the format of:
  // {
  // artist: str,
  // song: str,
  // album: str,
  // }

  formatData() {
    return this.props.selectedChannel.historicalPlayLists.reduce(
      (accumulator, currentValue) => {
        accumulator.push(currentValue.song)
        return accumulator
      },
      []
    )
  }

  async componentDidUpdate(prevProps) {
    //Checks to see if previous state is =/!= to the current state by ID. Needs to be a string (primitive type) and not an object because of types
    if (
      String(prevProps.selectedChannel.id) !== this.props.match.params.channelId
    ) {
      await this.props.fetchSelectedChannel(
        Number(this.props.match.params.channelId)
      )
      this.setState({
        joined: false
      })
    }
  }

  joinChannel() {
    //TODO:
    //Plug in logic to actually "join" the channel
    this.setState({
      joined: true
    })
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
                    {/* Current Song Information */}
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
                        {/*
                      TODO: Plug in player
                      {} */}
                        {selectedChannel.ownerId !== this.props.user.id &&
                        this.state.joined === false ? (
                          <Button onClick={this.joinChannel}>
                            Join Channel
                          </Button>
                        ) : selectedChannel.ownerId === this.props.user.id ? (
                          <Player />
                        ) : (
                          'Time stamp info'
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              {/* Tabulated Tables. Shows Either the Spotify Search results or the channel's active playlist */}
              <Row>
                <Tabs defaultActiveKey="playlist" id="music-tables-tabs">
                  <Tab eventKey="playlist" title="Playlist">
                    {selectedChannel.description ? (
                      this.props.selectedChannel.historicalPlayLists !==
                      historicalPlayList ? (
                        <ScrollTable
                        // playList={historicalPlayList}
                        />
                      ) : (
                        <ScrollTable
                        // playList={historicalPlayList}
                        />
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
            {/* Chat/Channel Information tabs. */}
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
                            <br /> {selectedChannel.name}{' '}
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
const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelId => dispatch(fetchSelectedChannel(channelId))
  }
}
const mapStateToProps = state => {
  return {
    selectedChannel: state.channel.selectedChannel,
    messages: state.message.messages,
    user: state.user
  }
}
export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
