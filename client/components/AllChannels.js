import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Col, Row} from 'react-bootstrap'
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
      <Container style={{alignContent: 'center'}}>
        <Row>
          <Row>
            <h2>Discover 🌎 </h2>
          </Row>
          <Row>
            {channels && channels.length ? (
              channels.map(channel => {
                return (
                  <Col key={channel.id} xs={4}>
                    <ConnectedChannelLineItem channel={channel} />
                  </Col>
                )
              })
            ) : (
              <Col xs={12} />
            )}
          </Row>
        </Row>
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
