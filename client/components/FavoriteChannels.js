import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col, ListGroup} from 'react-bootstrap'
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
        <ListGroup>
          <h3>Favorite Channels</h3>
          {favorites && favorites.length ? (
            favorites.map(channel => (
              <ListGroup.Item key={channel.id} style={{border: 'none'}}>
                <Link to={`/channels/${channel.id}`} className="link-styling">
                  {channel.name}{' '}
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <Col xs={12}>
              <Card border="light">
                <Card.Text className="center">No favorite channels</Card.Text>
              </Card>
            </Col>
          )}
        </ListGroup>
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
