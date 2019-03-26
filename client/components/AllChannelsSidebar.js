import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Col, ListGroup} from 'react-bootstrap'
import {fetchChannels} from '../store/channel'
import {ConnectedChannelLineItemSidebar} from './ChannelLineItemSidebar'

export class AllChannelsSidebar extends Component {
  async componentDidMount() {
    await this.props.fetchChannels()
  }

  render() {
    const channels = this.props.allChannels

    return (
      <Container>
        <h4>All Channels</h4>
        <ListGroup>
          {channels && channels.length ? (
            channels.map(channel => {
              return (
                <ConnectedChannelLineItemSidebar
                  changeChannel={this.props.fetchChannels}
                  key={channel.id}
                  channel={channel}
                />
              )
            })
          ) : (
            <Col xs={12}>
              <Card border="light">
                <Card.Text className="center">No Channels Found</Card.Text>
              </Card>
            </Col>
          )}
        </ListGroup>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  }
}

const mapStateToProps = state => {
  return {
    allChannels: state.channel.allChannels
  }
}
export const ConnectedAllChannelsSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannelsSidebar)
