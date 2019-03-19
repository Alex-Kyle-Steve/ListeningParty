import axios from 'axios'

//Action
const SEARCH_SPOTIFY = 'SEARCH_SPOTIFY'

//Aciton Creator
export const catalogSearch = query => {
  return {
    type: SEARCH_SPOTIFY
  }
}
