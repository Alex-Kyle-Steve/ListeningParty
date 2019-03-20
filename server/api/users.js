const router = require('express').Router()
const {User} = require('../db/models')
const axios = require('axios')
require('../../secrets')
module.exports = router

router.get('/refreshToken', async (req, res, next) => {
  try {
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
