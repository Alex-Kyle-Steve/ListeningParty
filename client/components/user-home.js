import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSelectedChannel} from '../store/channel'
import {
  ConnectedFavoriteChannels,
  ConnectedOwnedChannels,
  ConnectedAllChannels
} from '.'

import {Row, Col, Container} from 'react-bootstrap'
/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  render() {
    return (
      <div className="user-home content">
        <Container fluid={true}>
          <Row>
            <Col className="my-center-align" xs={3}>
              <ConnectedOwnedChannels
                changeChannel={this.props.fetchSelectedChannel}
              />
              <hr />
              <ConnectedFavoriteChannels
                changeChannel={this.props.fetchSelectedChannel}
              />
            </Col>
            <Col className="custom-center-align" xs={6}>
              <ConnectedAllChannels />
            </Col>
            <Col className="my-center-align" xs={3}>
              <h1>Chat Column Here</h1>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}
const mapDispatch = dispatch => {
  return {
    fetchSelectedChannel: channelId => dispatch(fetchSelectedChannel(channelId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
