import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, MusicPlayer} from './components'
import {me} from './store'
import axios from 'axios'
/**
 * COMPONENT
 */
// const accessToken =
//   'BQADUvezmfN3OH-8Vn-1DEt7D7idfmsaDT4L1PBwk14T2DKM3uPjlV6AXiHf7WKO_CV4A4qVrSlzfXBhHKmlTfbjHlYYMEi4QrvMT69dSOe9Wd1oJ1ypOdlWXnRzf4ef-AFhq1-x8L7SCrYl_ulipCRaNQGV7dT7Z2i1kFeqhdnKa4vufRkFYzZgAV4KSVQjmY4KV1OhRGb0gPxwqAWrvvWyCQ'
// const refreshToken =
//   'AQBbNuS5TbVz4jLVC_9RdsL6ZEhXpnH7R2zD82a4pFIA4CRu_R9d-WLyOMPUHiUDIoq6YTw4hsIAp8Vy60F-0m4edLOYTRdo5s9A5B_V66-ZQfLCZGqIkeHiygD3LEPnOTwr8Q'

// const accessHeader = {
//   Authorization: 'Bearer ' + accessToken,
//   'Content-Type': 'application/x-www-form-urlencoded'
// }

// const refreshHeader = {
//   grant_type: 'refresh_token',
//   refresh_token: refreshToken
// }

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    // axios({
    //   method: 'get',
    //   url: `https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,playlist,artist,track`,
    //   headers: accessHeader
    // })
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  // getAccessToken() {
  //   axios({
  //     method: 'post',
  //     url: 'https://accounts.spotify.com/api/token',
  //     headers: refreshHeader
  //   })
  //     .then(res => {
  //       console.log(res)
  //       console.log('SUCESS')
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/music-player" component={MusicPlayer} />
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
