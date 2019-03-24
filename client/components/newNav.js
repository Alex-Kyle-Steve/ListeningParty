import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {
  Button,
  Image,
  Col,
  Row,
  Container,
  Table,
  Form,
  Navbar,
  NavDropdown,
  Nav
} from 'react-bootstrap'

const NewNavbar = ({handleClick, isLoggedIn}) => (
  // <div className="nav">

  <Navbar>
    <Navbar.Brand href="/home">Listening Party</Navbar.Brand>

    {isLoggedIn ? (
      <Nav className="mr-auto">
        {/* The navbar will show these links after you log in */}
        <Nav.Link className="link-styling" href="/home">
          Home
        </Nav.Link>
        <Nav.Link href="/login" className="link-styling" onClick={handleClick}>
          Logout
        </Nav.Link>
        <Nav.Link href="newchannel" className="link-styling">
          Create New Channel
        </Nav.Link>
      </Nav>
    ) : (
      <Nav className="mr-auto">
        <Nav.Link className="link-styling" href="/login">
          Login
        </Nav.Link>
        <Nav.Link className="link-styling" href="/signup">
          Sign up
        </Nav.Link>
      </Nav>
    )}
  </Navbar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NewNavbar)

/**
 * PROP TYPES
 */
NewNavbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
