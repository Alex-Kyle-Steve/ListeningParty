import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col, Table, Modal, Popover} from 'react-bootstrap'
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
    console.log(historicalPlayList)
    return (
      <Container>
        <Card>
          <Card.Title>
            <Card.Body />
          </Card.Title>
        </Card>
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
