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
router.get('/:channelId', async (req, res, next) => {
  try {
    const selectedChannel = await Channel.findById(req.params.channelId, {
      include: [
        {model: User, as: 'owner'},
        {model: HistoricalPlayList, include: [{model: Song}]}
      ],
      order: [[HistoricalPlayList, 'id', 'DESC']]
    })
    res.json(selectedChannel)
  } catch (err) {
    next(err)
  }
})
