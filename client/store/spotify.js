import axios from 'axios'

// grants access token from user session. only handles successful request
// - TODO: refreshing token, handling error
export const getAccessToken = () =>
  axios
    .get('/auth/spotify/token')
    // send status code if the status was 200
    .then(res => {
      if (res.status === 200) return res.data.accessToken
    })
