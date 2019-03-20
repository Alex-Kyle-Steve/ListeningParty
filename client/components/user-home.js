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
    // <div className="container">
    //   <div className="row">
    //     <div className="col-sm">One of three columns</div>
    //     <div className="col-sm">One of three columns</div>
    //     <div className="col-sm">One of three columns</div>
    //   </div>
    // </div>
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
