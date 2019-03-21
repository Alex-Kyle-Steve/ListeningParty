import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

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
    return (
      <Container>
        <h3>Selected Channel</h3>
        {selectedChannel.name ? (
          <div>
            <h4>Channel Name:</h4>
            <span>{selectedChannel.name}</span>
            <h4>Channel Description:</h4>
            <span>{selectedChannel.description}</span>
            <h4>Channel Owner:</h4>
            <span>{selectedChannel.owner.firstName}</span>
            <br />
          </div>
        ) : (
          'No valid channel selected'
        )}
        {historicalPlayList && historicalPlayList.length ? (
          historicalPlayList.map(song => (
            <Row key={song.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <h4>Song:</h4>
                    <span>{song.song.title}</span>
                    <h4>Artist:</h4>
                    <span>{song.song.artist}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </Row>
          ))
        ) : (
          <Col xs={12}>
            <Card border="light">
              <Card.Text className="center">
                <h2>No historical play list</h2>
              </Card.Text>
            </Card>
          </Col>
        )}
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
