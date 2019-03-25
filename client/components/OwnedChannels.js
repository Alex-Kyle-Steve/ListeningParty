import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Col, ListGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {deleteChannel, fetchOwnedChannels, me} from '../store/'
import history from '../history'

export class OwnedChannels extends Component {
  constructor() {
    super()
    this.deleteChannel = this.deleteChannel.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchMe()
    await this.props.fetchOwnedChannels(this.props.user.id)
  }
  editChannel(event) {
    const href = event.target.parentNode.firstChild.href
    const channelId = parseInt(href.slice(href.lastIndexOf('/') + 1))
    history.push(`/editChannel/${channelId}`)
  }
  async deleteChannel(event) {
    const href = event.target.parentNode.firstChild.href
    const channelId = parseInt(href.slice(href.lastIndexOf('/') + 1))
    await this.props.deleteChannel(channelId)
    await this.props.fetchOwnedChannels(this.props.user.id)
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
                <Link to={`/channels/${channel.id}`} className="link-styling">
                  {channel.name}{' '}
                </Link>
                <button
                  type="button"
                  onClick={this.editChannel}
                  className="channel-btn"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={this.deleteChannel}
                  className="channel-btn"
                >
                  Delete
                </button>
              </ListGroup.Item>
            ))
          ) : (
            <Col xs={12}>
              <Card border="light">
                <Card.Text className="center">
                  No owned channels
                  <br />
                  <Link
                    to="/newchannel"
                    className="create-channel-sidebar-link "
                  >
                    <Button variant="primary" size="sm">
                      Create Channel
                    </Button>
                  </Link>
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
    deleteChannel: channelId => dispatch(deleteChannel(channelId)),
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
