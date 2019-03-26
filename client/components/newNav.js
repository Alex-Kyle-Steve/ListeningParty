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
  <Navbar>
    <Navbar.Brand href="/home">
      <h1>Listening 🎉 Party</h1>
    </Navbar.Brand>

    {isLoggedIn ? (
      <Nav className="mr-auto">
        {/* The navbar will show these links after you log in */}
        <Link to="/home">
          <Nav.Item className="link-styling">Home</Nav.Item>
        </Link>
        <Link to="/login">
          <Nav.Item className="link-styling" onClick={handleClick}>
            Logout
          </Nav.Item>
        </Link>
        <Link to="/newchannel">
          <Nav.Item className="link-styling">Create Channel</Nav.Item>
        </Link>
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
