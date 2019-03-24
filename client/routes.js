import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  ConnectedFavoriteChannels,
  ConnectedOwnedChannels,
  ConnectedAllChannels,
  ConnectedSelectedChannel,
  ConnectedNewChannel,
  ConnectedEditChannel,
  ConnectedSelectedSong,
  ConnectedEditUser,
  ConnectedMessages
} from './components'
import {me, initializePlayerInstance} from './store'
/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate() {
    this.props.isWithSpotify &&
      !this.props.player &&
      this.props.loadSpotifyPlayer()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/allChannels" component={ConnectedAllChannels} />
          <Route
            path="/channels/:channelId"
            component={ConnectedSelectedChannel}
          />
          <Route path="/songs/:songId" component={ConnectedSelectedSong} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route
                path="/favoriteChannels"
                component={ConnectedFavoriteChannels}
              />
              <Route path="/ownedChannels" component={ConnectedOwnedChannels} />
              <Route
                path="/editChannel/:channelId"
                component={ConnectedEditChannel}
              />
              <Route path="/newChannel" component={ConnectedNewChannel} />
              <Route path="/chat" component={ConnectedMessages} />
              <Route path="/editUser/:userId" component={ConnectedEditUser} />
              <Route component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isWithSpotify: !!state.user.spotifyId,
    player: state.player
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadSpotifyPlayer() {
      dispatch(initializePlayerInstance())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
