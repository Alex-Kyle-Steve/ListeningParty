import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {Navbar, Nav} from 'react-bootstrap'
import {withRouter, NavLink} from 'react-router-dom'

const NewNav = ({handleClick, isLoggedIn, isAdmin, user}) => (
  <Navbar bg="light" expand="lg" className="myNav">
    <Navbar.Brand href="/home">Brett's Beer Fridge</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {isLoggedIn ? (
        isAdmin ? (
          <Nav className="mr-auto myNavLink">
            <NavLink to="/home" activeClassName="is-active">
              Home
            </NavLink>
            <NavLink to="/beers/page/1" activeClassName="is-active">
              Beers
            </NavLink>
            <NavLink to="/cart" activeClassName="is-active">
              Cart
            </NavLink>
            <NavLink to="/orders" activeClassName="is-active">
              Orders
            </NavLink>
            <NavLink to="/addbeer" activeClassName="is-active">
              Create Beer
            </NavLink>
            <NavLink to="/users" activeClassName="is-active">
              Users
            </NavLink>
            <NavLink to={`/users/${user.id}`} activeClassName="is-active">
              {' '}
              My Profile{' '}
            </NavLink>
            <NavLink to="#" onClick={handleClick}>
              Logout
            </NavLink>
          </Nav>
        ) : (
          <Nav className="mr-auto myNavLink">
            <NavLink to="/home" activeClassName="is-active">
              Home
            </NavLink>
            <NavLink to={`/users/${user.id}`} activeClassName="is-active">
              {' '}
              My Profile{' '}
            </NavLink>
            <NavLink to="#" onClick={handleClick}>
              Logout
            </NavLink>
          </Nav>
        )
      ) : (
        <Nav className="mr-auto myNavLink">
          <NavLink to="/login" activeClassName="is-active">
            Login
          </NavLink>
          <NavLink to="/signup" activeClassName="is-active">
            Sign Up
          </NavLink>
          <NavLink to="/beers/page/1" activeClassName="is-active">
            Beers
          </NavLink>
          <NavLink to="/cart" activeClassName="is-active">
            Cart
          </NavLink>
        </Nav>
      )}
    </Navbar.Collapse>
  </Navbar>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.userType === 'admin',
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewNav))

/**
 * PROP TYPES
 */
NewNav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
