const router = require('express').Router()
const {
  User,
  Channel,
  HistoricalPlayList,
  Song,
  Message
} = require('../db/models')
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
router.post('/', async (req, res, next) => {
  try {
    const newChannel = await Channel.create(req.body)
    res.json(newChannel)
  } catch (err) {
    next(err)
  }
})

router.param('channelId', async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.channelId, {
      include: [
        {model: User, as: 'owner'},
        {model: Message, include: [{model: User}]},
        {model: HistoricalPlayList, include: [{model: Song}]}
      ],
      order: [[HistoricalPlayList, 'id', 'DESC']]
    })
    req.selectedChannel = channel
    next()
  } catch (err) {
    next(err)
  }
})

router.put('/:channelId', async (req, res, next) => {
  try {
    const updatedChannel = await req.selectedChannel.update(req.body)
    res.json(updatedChannel)
  } catch (err) {
    next(err)
  }
})
router.delete('/:channelId', async (req, res, next) => {
  try {
    await req.selectedChannel.destroy()
    res.status(200).send('Successfully deleted Channel')
  } catch (err) {
    next(err)
  }
})

router.get('/:channelId', (req, res, next) => {
  try {
    res.json(req.selectedChannel)
  } catch (err) {
    next(err)
  }
})

router.get('/:channelId/messages', (req, res, next) => {
  res.json(req.selectedChannel.messages)
})
