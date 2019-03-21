import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Card, Button, Row, Col, Form} from 'react-bootstrap'
import {fetchSelectedChannel, updateChannel} from '../store'
import history from '../history'

class EditChannel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.selectedChannel.name,
      description: props.selectedChannel.description,
      ownerId: props.selectedChannel.ownerId
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    const channelId = parseInt(this.props.match.params.channelId)
    await this.props.fetchSelectedChannel(channelId)
    this.setState({
      name: this.props.selectedChannel.name,
      description: this.props.selectedChannel.description,
      ownerId: this.props.selectedChannel.ownerId
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = async event => {
    event.preventDefault()
    await this.props.updateChannel(this.props.selectedChannel.id, this.state)
    history.push(`/channels/${this.props.selectedChannel.id}`)
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
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={this.state.description}
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
    updateChannel: (channelId, channelData) =>
      dispatch(updateChannel(channelId, channelData)),
    fetchSelectedChannel: channelId => dispatch(fetchSelectedChannel(channelId))
  }
}
const mapStateToProps = state => {
  return {
    userId: state.user.id,
    selectedChannel: state.channel.selectedChannel
  }
}

export const ConnectedEditChannel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditChannel)
