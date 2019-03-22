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
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
// import {ConnectedFavoriteChannels} from './FavoriteChannels'
// import {ConnectedOwnedChannels} from './OwnedChannels'

export class SelectedChannel extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    await this.props.fetchSelectedChannel(channelId)
  }

  formatData() {
    console.log(this.props.selectedChannel.historicalPlayLists)
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

    return (
      <div>
        <Container fluid={true}>
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
                <ScrollTable playList={historicalPlayList} />
              </Row>
            </Col>
          </Row>
          <Row>
            <ConnectedSpotifyCatalogSearch />
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
