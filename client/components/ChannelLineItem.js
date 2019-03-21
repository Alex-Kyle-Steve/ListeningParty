import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, Button, Modal} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ChanneLineItem extends Component {
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
      <Container>
        <ListGroup.Item key={this.props.channel.id} style={{border: 'none'}}>
          <Link
            to={`/channels/${this.props.channel.id}`}
            className="link-styling-quick-info"
          >
            {this.props.channel.name}{' '}
          </Link>
          <Button
            variant="link"
            className="link-styling"
            onClick={this.handleShow}
            size="sm"
          >
            quick info
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

              <Link to={`channels/${this.props.channel.id}`}>
                {' '}
                <Button variant="success" onClick={this.handleClose}>
                  Join Channel
                </Button>{' '}
              </Link>
            </Modal.Footer>
          </Modal>
        </ListGroup.Item>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    allChannels: state.channel.allChannels
  }
}
export const ConnectedChannelLineItem = connect(mapStateToProps, null)(
  ChanneLineItem
)
