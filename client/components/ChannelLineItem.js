import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Container,
  ListGroup,
  Button,
  Modal,
  Card,
  CardDeck
} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class ChanneLineItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      show: false,
      images: [
        'https://picsum.photos/300/300?blur?image=4',
        'https://picsum.photos/300/300?blur?image=1',
        'https://picsum.photos/300/300?blur?image=2',
        'https://picsum.photos/300/300?blur?image=3',
        'https://picsum.photos/300/300?blur?image=6',
        'https://picsum.photos/300/300?blur?image=7',
        'https://picsum.photos/300/300?blur?image=8',
        'https://picsum.photos/300/300?blur?image=9',
        'https://picsum.photos/300/300?blur?image=10',
        'https://picsum.photos/300/300?image=1',
        'https://picsum.photos/300/300?image=2',
        'https://picsum.photos/300/300?image=3',
        'https://picsum.photos/300/300?image=4',
        'https://picsum.photos/300/300?image=5',
        'https://picsum.photos/300/300?image=6',
        'https://picsum.photos/300/300?image=7',
        'https://picsum.photos/300/300?image=8',
        'https://picsum.photos/300/300?image=9',
        'https://picsum.photos/300/300?image=10',
        'https://picsum.photos/300/300?image=11',
        'https://picsum.photos/300/300?image=12',
        'https://picsum.photos/300/300?image=13',
        'https://picsum.photos/300/300?image=14',
        'https://picsum.photos/300/300?image=15',
        'https://picsum.photos/300/300?image=16',
        'https://picsum.photos/300/300?image=17',
        'https://picsum.photos/300/300?image=18',
        'https://picsum.photos/300/300?image=19',
        'https://picsum.photos/300/300?image=20',
        'https://picsum.photos/300/300?image=21'
      ]
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
        <CardDeck>
          <Card>
            <Card.Img
              variant="top"
              src={this.state.images[Math.floor(Math.random() * 22) + 5]}
              alt={this.state.images[Math.floor(Math.random() * 10) + 1]}
            />
            <Card.Body>
              <Card.Title>
                {' '}
                <Link to={`/channels/${this.props.channel.id}`}>
                  <Card.Title className="link-styling">
                    {this.props.channel.name}{' '}
                  </Card.Title>
                </Link>
              </Card.Title>
              <Card.Text>
                <Button
                  variant="link"
                  className="link-styling"
                  onClick={this.handleShow}
                  size="sm"
                >
                  Quick Info
                </Button>
                <Link to={`channels/${this.props.channel.id}`}>
                  {' '}
                  <Button
                    variant="link"
                    className="link-styling"
                    onClick={this.handleClose}
                    size="sm"
                  >
                    Join Channel
                  </Button>
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
        {/* <ListGroup.Item key={this.props.channel.id} style={{border: 'none'}}> */}
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
        {/* </ListGroup.Item> */}
        {/* </Card> */}
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
