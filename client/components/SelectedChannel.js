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
import {ScrollTable} from './ScrollTable'
import {ConnectedSpotifyCatalogSearch} from './spotifyCatalogSearch'
import {fetchSelectedChannel} from '../store/channel'
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {ConnectedFavoriteChannels} from './FavoriteChannels'
import {ConnectedOwnedChannels} from './OwnedChannels'

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
      <div>
        <Container>
          <Row>
            <Col xs={6}>
              <Card>
                <Card.Img src="https://i.scdn.co/image/2b2c35974280d813521f8e9b5962f043136d3440" />
              </Card>
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
                {/* React BootStrap table */}
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
                {/* React-bootstrap-tables  */}
                {/* <ScrollTable playList={historicalPlayList} /> */}
                {/* vanilla html */}
                <table cellspace="0" cellPadding="0" border="0" width="320">
                  <tbody>
                    <tr>
                      <td style={{width: '10px'}}>
                        <table
                          cellspace="300"
                          cellPadding="10"
                          border="1"
                          height="20"
                          width="300"
                        >
                          <tbody>
                            <tr
                              style={{
                                width: '400px',
                                color: 'black',
                                backgroundColor: 'wheat'
                              }}
                            >
                              <th>Artist</th>
                              <th>Song</th>
                              <th>Album</th>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          style={{
                            width: '400px',
                            height: '400px',
                            overflow: 'auto'
                          }}
                        >
                          <table
                            cellspace="0"
                            cellPadding="1"
                            border="1"
                            width="300"
                          >
                            {historicalPlayList ? (
                              historicalPlayList.map(song => {
                                return (
                                  <tbody key={song.song.id}>
                                    <tr>
                                      <td>{song.song.artist}</td>
                                      <td>{song.song.title}</td>
                                      <td>{song.song.album}</td>
                                    </tr>
                                  </tbody>
                                )
                              })
                            ) : (
                              <tbody>
                                <tr>
                                  <td>No Songs</td>
                                </tr>
                              </tbody>
                            )}
                          </table>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </Col>
          </Row>
          <Row>
            <ConnectedSpotifyCatalogSearch />

            {/* <Col xs={6}>

          </Col> */}
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
    selectedChannel: state.channel.selectedChannel
  }
}
export const ConnectedSelectedChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedChannel)
