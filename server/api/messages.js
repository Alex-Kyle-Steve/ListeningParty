const router = require('express').Router()
const {Message, User, Channel} = require('../db/models')

module.exports = router

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll({include: [Channel]})
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId)
    const newMessage = Message.create(req.body)
    newMessage.user = user
    res.json(newMessage)
  } catch (err) {
    next(err)
  }
})

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  try {
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)
    await message.update(req.body)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId
    await Message.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
