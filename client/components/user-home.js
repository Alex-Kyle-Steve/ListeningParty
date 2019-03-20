import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'

import {
  ConnectedFavoriteChannels,
  ConnectedOwnedChannels,
  ConnectedAllChannels
} from '.'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  render() {
    const {email} = this.props

    return (
      <Container className="left-side-bar">
        <h3>Welcome, {email}</h3>
        <Row>
          <Col xs={4}>
            <ConnectedFavoriteChannels />
          </Col>
          <Col xs={4}>
            <ConnectedOwnedChannels />
          </Col>
          <Col xs={4}>
            <ConnectedAllChannels />
          </Col>
        </Row>
      </Container>
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
