import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postMessage, writeMessage} from '../store'

class NewMessageEntry extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.props.writeMessage(evt.target.value)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    this.props.postMessage({
      userId: this.props.user.id,
      content: this.props.newMessageEntry,
      channelId: this.props.selectedChannel.id
    })
    this.props.writeMessage('')
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Enter message here"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              Chat!
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
    newMessageEntry: state.message.newMessageEntry,
    selectedChannel: state.channel.selectedChannel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: message => dispatch(postMessage(message)),
    writeMessage: string => dispatch(writeMessage(string))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
