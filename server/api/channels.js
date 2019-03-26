const router = require('express').Router()
const {User, Channel, Song} = require('../db/models')
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

// get the playlist associated with the channel
router.get('/:channelId/playlist', (req, res, next) =>
  // get channel's playlist: an array of trackId
  Channel.findById(req.params.channelId, {attributes: ['playlist']}).then(
    // map through that array and find the song by its id
    chPlaylist =>
      // return the found track and create a mapped array of track
      chPlaylist.map(trackId => Song.findById(trackId).then(track => track))
  )
)
