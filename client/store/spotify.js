import axios from 'axios'

export const getAccessToken = () =>
  axios
    .get('/auth/spotify/token')
    // send status code if the status was 200
    .then(res => res.status === 200 && res.data.accessToken)
