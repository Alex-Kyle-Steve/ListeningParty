import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Col, ListGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {fetchOwnedChannels, me} from '../store/user'

export class OwnedChannels extends Component {
  constructor() {
    super()
  }

  handleClick() {
    // this.props.changeChannel(this.props.channelId)
  }
  async componentDidMount() {
    // await this.props.fetchMe()
    // await this.props.fetchOwnedChannels(this.props.user.id)
  }

  render() {
    const ownedChannels = this.props.ownedChannels
    return (
      <Container fluid={true}>
        <ListGroup>
          <h4>My Channels</h4>
          {ownedChannels && ownedChannels.length ? (
            ownedChannels.map(channel => (
              <ListGroup.Item key={channel.id} style={{border: 'none'}}>
                <Link
                  to={`/channels/${channel.id}`}
                  className="link-styling"
                  // onClick={this.handleClick()}
                >
                  {channel.name}{' '}
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <Col xs={12}>
              <Card border="light">
                <Card.Text className="center">
                  No owned channels
                  <br />
                  Want to create a channel?
                </Card.Text>
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
    fetchOwnedChannels: userId => dispatch(fetchOwnedChannels(userId)),
    fetchMe: () => dispatch(me())
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    ownedChannels: state.channel.ownedChannels
  }
}
export const ConnectedOwnedChannels = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnedChannels)
