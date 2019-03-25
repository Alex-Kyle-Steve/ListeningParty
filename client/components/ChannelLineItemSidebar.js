import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, Button, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {addFavoriteChannel, me} from '../store/user'

class ChannelLineItemSidebar extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      show: false
    }
  }

  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({
      show: true
    })
  }
  async handleClick(event) {
    const href = event.target.parentNode.firstChild.href
    const channelId = parseInt(href.slice(href.lastIndexOf('/') + 1))
    await this.props.addFavoriteChannel(this.props.user.id, channelId)
  }
  render() {
    return (
      <ListGroup.Item
        key={this.props.channel.id}
        style={{border: 'none'}}
        className="line-item-sidebar-hover"
      >
        <Link
          to={`/channels/${this.props.channel.id}`}
          className="link-styling"
        >
          {this.props.channel.name}{' '}
        </Link>
        <Button
          variant="link"
          className="link-styling"
          onClick={this.handleShow}
          size="sm"
        >
          Quick Info
        </Button>
        <button type="button" className="list-btn" onClick={this.handleClick}>
          +
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.channel.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.channel.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>

            <Link to={`/channels/${this.props.channel.id}`}>
              {' '}
              <Button variant="success" onClick={this.handleClose}>
                Join Channel
              </Button>{' '}
            </Link>
          </Modal.Footer>
        </Modal>
      </ListGroup.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    allChannels: state.channel.allChannels,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addFavoriteChannel: (userId, channelId) =>
      dispatch(addFavoriteChannel(userId, channelId)),
    fetchMe: () => dispatch(me())
  }
}
export const ConnectedChannelLineItemSidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelLineItemSidebar)
