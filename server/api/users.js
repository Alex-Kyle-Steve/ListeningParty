const router = require('express').Router()
const {User, Channel} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'email',
        'firstName',
        'lastName',
        'status',
        'gender',
        'birthDate'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId/channels', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Channel, as: 'ownedChannels'}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId/favorites', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Channel, as: 'favoriteChannel'}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.post('/:userId/favorites/:channelId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const channel = await Channel.findById(req.params.channelId)
    user.addChannel(channel, {as: 'favoriteChannel'})
    res.json('Favorite channel added to user')
  } catch (err) {
    next(err)
  }
})
router.delete('/:userId/favorites/:channelId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const channel = await Channel.findById(req.params.channelId)
    user.removeChannel(channel, {as: 'favoriteChannel'})
    res.json('Favorite channel removed from user')
  } catch (err) {
    next(err)
  }
})
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    const updatedUser = user.destroy()
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})
