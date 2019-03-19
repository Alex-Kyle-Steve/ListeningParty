import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Row, Col, Table, Image, Form, Container} from 'react-bootstrap'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Container>
      <Row>
        <Col>
          <h1>WELCOME</h1>
        </Col>
      </Row>

      <div />
    </Container>
  )
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
