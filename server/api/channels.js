const router = require('express').Router()
const {User, Channel} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allChannels = await Channel.findAll({
      include: [{model: User, as: 'owner'}]
    })
    res.json(allChannels)
  } catch (err) {
    next(err)
  }
})
