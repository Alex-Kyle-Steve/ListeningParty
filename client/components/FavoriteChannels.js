import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {fetchFavoriteChannels} from '../store/channel'

export class FavoriteChannels extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    console.log(
      'Inside FavoriteChannels component componentDidMount this.props.fetchFavoriteChannels"\n',
      this.props.fetchFavoriteChannels
    )
    this.props.fetchFavoriteChannels(this.props.user.id)
  }

  render() {
    const favorites = this.props.favoriteChannels
    return (
      <div>
        <Container>
          <Row>
            {favorites && favorites.length ? (
              favorites.map(channel => (
                <Col key={channel.id} xs={12}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <Link to={`/channels/${channel.id}`}>
                          {channel.name}{' '}
                        </Link>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
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
          </Row>
        </Container>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchFavoriteChannels: userId => dispatch(fetchFavoriteChannels(userId))
  }
}
const mapStateToProps = state => {
  console.log(
    'Inside FavoriteChannels component mapStateToProps state:\n',
    state
  )
  return {
    user: state.user,
    favoriteChannels: state.channel.favoriteChannels
  }
}
export const ConnectedFavoriteChannels = connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoriteChannels)
