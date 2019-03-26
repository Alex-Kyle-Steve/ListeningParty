import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postMessage} from '../store'

class NewMessageEntry extends Component {
  constructor() {
    super()
    this.state = {newMessageEntry: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.writeMessage(evt.target.value)
  }
  writeMessage(inString) {
    this.setState({newMessageEntry: inString})
  }
  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.postMessage(
      {
        userId: this.props.user.id,
        content: this.state.newMessageEntry,
        channelId: this.props.selectedChannel.id
      },
      this.props.user
    )
    this.writeMessage('')
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Enter message here"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Send
            </button>
          </span>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    selectedChannel: state.channel.selectedChannel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, user) => dispatch(postMessage(message, user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
