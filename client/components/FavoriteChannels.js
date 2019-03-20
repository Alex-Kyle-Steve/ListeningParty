import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {fetchFavoriteChannels, me} from '../store/user'

export class FavoriteChannels extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    await this.props.fetchMe()
    await this.props.fetchFavoriteChannels(this.props.user.id)
  }

  render() {
    const favorites = this.props.favoriteChannels
    return (
      <Container>
        <h3>Favorite Channels</h3>
        {favorites && favorites.length ? (
          favorites.map(channel => (
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
    fetchFavoriteChannels: userId => dispatch(fetchFavoriteChannels(userId)),
    fetchMe: () => dispatch(me())
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    favoriteChannels: state.channel.favoriteChannels
  }
}
export const ConnectedFavoriteChannels = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteChannels)
