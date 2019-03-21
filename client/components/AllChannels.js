import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Col, ListGroup} from 'react-bootstrap'
import {fetchChannels} from '../store/channel'
import {ConnectedChannelLineItem} from './ChannelLineItem'

export class AllChannels extends Component {
  constructor(props, context) {
    super(props, context)
  }
  async componentDidMount() {
    await this.props.fetchChannels()
  }

  render() {
    const channels = this.props.allChannels

    return (
      <Container>
        <ListGroup>
          <h3>All Channels</h3>
          {channels && channels.length ? (
            channels.map(channel => {
              return (
                <ConnectedChannelLineItem key={channel.id} channel={channel} />
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
export const ConnectedAllChannels = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
