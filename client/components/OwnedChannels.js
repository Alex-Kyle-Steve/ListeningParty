import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {fetchOwnedChannels, me} from '../store/user'

export class OwnedChannels extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.fetchMe()
    await this.props.fetchOwnedChannels(this.props.user.id)
  }

  render() {
    const ownedChannels = this.props.ownedChannels
    return (
      <Container>
        <h3>Owned Channels</h3>
        {ownedChannels && ownedChannels.length ? (
          ownedChannels.map(channel => (
            <Row key={channel.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
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
                <h2>No owned channels</h2>
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
