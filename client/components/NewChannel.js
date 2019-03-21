import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {createChannel, me} from '../store'
import history from '../history'

class NewChannel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      ownerId: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchMe()
    this.setState({ownerId: this.props.userId})
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    await this.props.createChannel(this.state)
    history.push(`/channels/${this.props.channelId}`)
  }

  render() {
    return (
      <div className="form">
        <Col xs={{span: 12, offset: 6}}>
          <Form className="marg-top" onSubmit={this.handleSubmit}>
            <Form.Group as={Row} controlId="formBasicTitle">
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={this.handleChange}
                placeholder="Enter channel name"
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={this.handleChange}
                placeholder="Enter Description"
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
    createChannel: channel => dispatch(createChannel(channel)),
    fetchMe: () => dispatch(me())
  }
}
const mapStateToProps = state => {
  return {
    userId: state.user.id,
    channelId: state.channel.selectedChannel.id
  }
}

export const ConnectedNewChannel = connect(mapStateToProps, mapDispatchToProps)(
  NewChannel
)
