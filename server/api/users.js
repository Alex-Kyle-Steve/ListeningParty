const router = require('express').Router()
const {User, Channel} = require('../db/models')

module.exports = router

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
