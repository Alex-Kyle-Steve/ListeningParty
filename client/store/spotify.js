import axios from 'axios'

//Action
const SEARCH_SPOTIFY = 'SEARCH_SPOTIFY'

//Aciton Creator
export const catalogSearch = query => {
  return {
    type: SEARCH_SPOTIFY,
    query
  }
}

//Thunk

export const searchCatalog = query => {
  return dispatch => {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${this.state.query}&type=track`,
      headers: {
        'Authorization':
          'Bearer BQBoBy8QXKpiiwe-gfzwV4tPNHrD1DDZtQ48OO38KI_PiH0fqGm_-t6FMj7SNitS42oO2-so--63eLyfhq3qv-7Sjev96BdG_Y7befirp8X2q9nMBG1jyJQt4GAxVIXPpQtdm1SS-fejAswGmKDsAqHNWjRe8V_mAeSGSI9rMwTnuiTVvAlIs5Hl21bhlwmz08amuZLwiKDbeu3jSmakE9NiXdmJ2usN8ReZ88o'
      }
    }).then(res => {
      console.log(res.data)
      return res.data
    })
    dispatch(catalogSearch(res.data))
  }
}
