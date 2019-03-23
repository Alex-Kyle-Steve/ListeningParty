import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, Button, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ChannelLineItemSidebar extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

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
    allChannels: state.channel.allChannels
  }
}
export const ConnectedChannelLineItemSidebar = connect(mapStateToProps, null)(
  ChannelLineItemSidebar
)
