import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {me, updateUser} from '../store'
import history from '../history'

class EditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user.name,
      firstName: props.user.description,
      lastName: props.user.ownerId,
      gender: props.user.ownerId,
      birthDate: props.user.birthDate
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.me()
    this.setState({
      email: this.props.user.email,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      status: this.props.user.status,
      gender: this.props.user.gender,
      birthDate: this.props.user.birthDate
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updateUser(this.props.user.id, this.state)
    history.push(`/home`)
  }

  render() {
    return (
      <div className="form">
        <Col xs={{span: 12, offset: 6}}>
          <Form className="marg-top" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formBasicTitle">
              <Form.Label>eMail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option>User</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              >
                <option>Non-Binary</option>
                <option>Female</option>
                <option>Male</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={this.state.birthDate}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, userData) => dispatch(updateUser(userId, userData)),
    me: () => dispatch(me())
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export const ConnectedEditUser = connect(mapStateToProps, mapDispatchToProps)(
  EditUser
)
