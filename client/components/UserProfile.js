import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Col} from 'react-bootstrap'

class UserProfile extends Component {
  render() {
    const user = this.props.user
    return (
      <div className="form">
        <Col xs={{span: 4, offset: 1}}>
          <h4>User Profile</h4>
          <p>
            <strong>eMail: </strong>
            <span>{user.email}</span>
          </p>
          <p>
            <strong>First Name: </strong>
            <span>{user.firstName}</span>
          </p>
          <p>
            <strong>Last Name: </strong>
            <span>{user.lastName}</span>
          </p>
          <p>
            <strong>Status: </strong>
            <span>{user.status}</span>
          </p>
          <p>
            <strong>Gender: </strong>
            <span>{user.gender}</span>
          </p>
          <p>
            <strong>Birth Date: </strong>
            <span>{user.birthDate}</span>
          </p>
          <br />
          <a href={`/editUser/${user.id}`}>Edit</a>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export const ConnectedUserProfile = connect(mapStateToProps, null)(UserProfile)
