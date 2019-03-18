const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
require('../../secrets')
module.exports = router

//     const accessHeader = {
//       ['Authorization']:
//         'Bearer ' +
//         ,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     const request = await axios({
//       method: 'get',
//       url: `https://api.spotify.com/v1/search?q=roadhouse%20blues&type=album,playlist,artist,track`,
//       headers: accessHeader
//     })
//     res
//       .send(request.data)
//       .then(res => {
//         console.log(res)
//       })
//       .catch(error => {
//         console.log(error)
//       })
router.get('/refreshToken', async (req, res, next) => {
  try {
    // console.log(process.env.SPOTIFY_CLIENT_ID)

    const refreshToken = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'applicaton/x-www-form-urlencoded'
        // ['Authorization']: 'Basic ' + Cliet ID : Client Secret
      },
      params: {
        grant_type: 'refresh_token',
        // ['refresh_token']: //User refresh token,
        success: () => {
          console.log(refreshToken)
        }
      }
    })

    res.send('HIT IT')
    next()
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
