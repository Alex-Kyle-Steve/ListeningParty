import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container, ListGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {fetchFavoriteChannels, removeFavoriteChannel, me} from '../store/user'

export class FavoriteChannels extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchMe()
    await this.props.fetchFavoriteChannels(this.props.user.id)
  }
  async handleClick(event) {
    const href = event.target.parentNode.firstChild.href
    const channelId = parseInt(href.slice(href.lastIndexOf('/') + 1))
    await this.props.removeFavoriteChannel(this.props.user.id, channelId)
  }

  render() {
    const favorites = this.props.favoriteChannels
    return (
      <Container>
        <ListGroup>
          <h4>Favorite Channels</h4>

          {favorites && favorites.length ? (
            favorites.map(channel => (
              <ListGroup.Item key={channel.id} style={{border: 'none'}}>
                <Link to={`/channels/${channel.id}`} className="link-styling">
                  {channel.name}{' '}
                </Link>
                <Button
                  variant="link"
                  className="favorite-channel-sidebar-button2"
                  onClick={this.handleClick}
                >
                  X
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item style={{border: 'none'}}>
              No favorite channels
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchFavoriteChannels: userId => dispatch(fetchFavoriteChannels(userId)),
    removeFavoriteChannel: (userId, channelId) =>
      dispatch(removeFavoriteChannel(userId, channelId)),
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
