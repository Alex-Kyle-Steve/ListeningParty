import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {fetchChannels} from '../store/channel'

export class AllChannels extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.fetchChannels()
  }

  render() {
    const channels = this.props.allChannels
    return (
      <Container>
        <h3>All Channels</h3>
        {channels && channels.length ? (
          channels.map(channel => (
            <Row key={channel.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </Row>
          ))
        ) : (
          <Col xs={12}>
            <Card border="light">
              <Card.Text className="center">
                <h2>No favorite channels</h2>
              </Card.Text>
            </Card>
          </Col>
        )}
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  }
}
const mapStateToProps = state => {
  return {
    allChannels: state.channel.allChannels
  }
}
export const ConnectedAllChannels = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)
