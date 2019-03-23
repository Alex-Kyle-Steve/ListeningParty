import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import {fetchMessages, me} from '../store'

class Messages extends Component {
  async componentDidMount() {
    await this.props.fetchMe()
    await this.props.fetchMessages()
  }

  render() {
    const channelId = Number(this.props.selectedChannel.id)
    const messages = this.props.messages
    const filteredMessages = messages.filter(message => {
      return message.channelId === channelId
    })

    return (
      <div>
        <h4>Chat Dialog</h4>
        <ul className="media-list">
          {filteredMessages.map(message => (
            <Message message={message} key={message.id} />
          ))}
        </ul>
        <NewMessageEntry channelId={channelId} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.message.messages,
    selectedChannel: state.channel.selectedChannel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
    fetchMe: () => dispatch(me())
  }
}

export const ConnectedMessages = connect(mapStateToProps, mapDispatchToProps)(
  Messages
)
