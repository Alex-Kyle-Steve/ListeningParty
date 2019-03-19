const router = require('express').Router()
const {User, Channel} = require('../db/models')
const axios = require('axios')
require('../../secrets')
module.exports = router

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
router.get('/:id/channels', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{model: Channel, as: 'ownedChannels'}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.get('/:id/favorites', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{model: Channel, as: 'favoriteChannel'}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
