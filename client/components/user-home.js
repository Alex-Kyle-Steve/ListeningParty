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
      <div>
        <Container>
          <Row>
            <Col className="my-center-align" xs={3}>
              A
            </Col>
            <Col className="my-center-align" xs={6}>
              B
            </Col>
            <Col className="my-center-align" xs={3}>
              C
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
