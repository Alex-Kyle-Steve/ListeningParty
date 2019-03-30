import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, Button, Modal, Card, CardDeck} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {addFavoriteChannel, me} from '../store/user'

class ChanneLineItem extends Component {
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
    const href = event.target.parentNode.childNodes[1].href
    const channelId = parseInt(href.slice(href.lastIndexOf('/') + 1))
    await this.props.addFavoriteChannel(this.props.user.id, channelId)
  }

  render() {
    return (
      <Container>
        <CardDeck>
          <Card border="light">
            <Link to={`/channels/${this.props.channel.id}`}>
              <Card.Img variant="top" src={this.props.channel.imageURL} />
            </Link>
            <Card.Body>
              <Card.Title>
                <Link to={`/channels/${this.props.channel.id}`}>
                  <Card.Title className="link-styling">{this.props.channel.name} </Card.Title>
                </Link>
              </Card.Title>
              <Card.Text>
                <Button variant="link" className="link-styling" onClick={this.handleShow} size="sm">
                  Quick Info
                </Button>

                <Link to={`channels/${this.props.channel.id}`}>
                  <Button
                    variant="link"
                    className="link-styling"
                    onClick={this.handleClose}
                    size="sm"
                  >
                    Join Room
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.channel.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.channel.description}</Modal.Body>
          <Modal.Footer>
            <Button variant="link" className="link-styling" onClick={this.handleClose}>
              Close
            </Button>

            <Link to={`channels/${this.props.channel.id}`}>
              <Button variant="link" className="link-styling" onClick={this.handleClose}>
                Join Channel
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>
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
    addFavoriteChannel: (userId, channelId) => dispatch(addFavoriteChannel(userId, channelId)),
    fetchMe: () => dispatch(me())
  }
}

export const ConnectedChannelLineItem = connect(mapStateToProps, mapDispatchToProps)(ChanneLineItem)
