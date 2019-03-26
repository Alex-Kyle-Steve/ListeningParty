const router = require('express').Router()
const {User, Channel, HistoricalPlayList, Song} = require('../db/models')
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
router.put('/:channelId', async (req, res, next) => {
  try {
    const editedChannel = await Channel.findById(req.params.channelId)
    const updatedChannel = await editedChannel.update(req.body)
    res.json(updatedChannel)
  } catch (err) {
    next(err)
  }
})
router.delete('/:channelId', async (req, res, next) => {
  try {
    const toDelete = await Channel.findById(req.params.channelId)
    await toDelete.destroy()
    res.status(200).send('Successfully deleted Channel')
  } catch (err) {
    next(err)
  }
})
router.get('/:channelId', async (req, res, next) => {
  try {
    const selectedChannel = await Channel.findById(req.params.channelId, {
      include: [{model: User, as: 'owner'}]
    })
    res.json(selectedChannel)
  } catch (err) {
    next(err)
  }
})
