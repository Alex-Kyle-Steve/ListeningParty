import React, {Component} from 'react'
import {connect} from 'react-redux'
import Message from './Message'
import NewMessageEntry from './NewMessageEntry'
import {fetchMessages} from '../store'

class Messages extends Component {
  async componentDidMount() {
    const channelId = this.props.selectedChannel.id
    channelId && (await this.props.fetchMessages(channelId))
  }

  async componentDidUpdate(prevState) {
    if (
      String(prevState.messages.length) !== String(this.props.messages.length)
    ) {
      const scrollList = document.getElementById('message-list')
      scrollList.scrollTop += scrollList.scrollHeight
    }
  }

  render() {
    const channelId = Number(this.props.selectedChannel.id)
    const messages = this.props.messages
    return (
      <div>
        <h4>{this.props.channel} Chat</h4>
        <hr />
        <div style={{overflow: 'scroll', height: '500px'}} id="message-list">
          <ul className="media-list">
            {(messages.length &&
              messages.map(message => (
                <Message message={message} key={message.id} />
              ))) ||
              ''}
          </ul>
        </div>
        <NewMessageEntry channelId={channelId} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.message.messages,
    selectedChannel: state.channel.selectedChannel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelId => dispatch(fetchMessages(channelId))
  }
}

export const ConnectedMessages = connect(mapStateToProps, mapDispatchToProps)(
  Messages
)
