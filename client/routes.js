import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  MusicPlayer,
  ConnectedFavoriteChannels,
  ConnectedOwnedChannels,
  ConnectedAllChannels,
  ConnectedSelectedChannel,
  ConnectedNewChannel
} from './components'
import {me} from './store'
import axios from 'axios'
/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/music-player" component={MusicPlayer} />
          <Route
            exact
            path="/favoriteChannels"
            component={ConnectedFavoriteChannels}
          />
          <Route
            exact
            path="/ownedChannels"
            component={ConnectedOwnedChannels}
          />
          <Route exact path="/allChannels" component={ConnectedAllChannels} />
          <Route
            exact
            path="/channels/:channelId"
            component={ConnectedSelectedChannel}
          />
          <Route path="/newChannel" component={ConnectedNewChannel} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/home" component={UserHome} />
              <Route exact path="/music-player" component={MusicPlayer} />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
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
