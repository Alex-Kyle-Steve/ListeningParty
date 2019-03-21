import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
        <Container>
          <Row>
            <Col className="my-center-align" xs={3}>
              <ConnectedOwnedChannels />
              <hr />
              <ConnectedFavoriteChannels />
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

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
