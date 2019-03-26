const router = require('express').Router()
const {User, Channel, Song} = require('../db/models')
const Op = require('sequelize').Op
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

// reducer passed into the below get request
const trackMapReducer = (accu, curr) => {
  // trackId is the key and value is the whole track
  return Object.assign(accu, {[curr.id]: curr})
}

/**
 * GET REQUEST:
 * - get the playlist associated with the channel as array of track
 * */
router.get('/:channelId/playlist', (req, res, next) =>
  // get channel's playlist: an array of trackId
  Channel.findById(req.params.channelId, {attributes: ['playlist']}).then(
    // find all song associated with the channel by their id
    chPlaylist =>
      Song.findAll({
        where: {
          [Op.or]: [...chPlaylist]
        },
        attributes: ['title', 'album', 'artist', 'id', 'uri']
      })
        // we need to reorder them before returning
        .then(playlist =>
          // create map of track: reduces the playlist array to object of key/value
          ({playlist, trackMap: playlist.reduce(trackMapReducer, {})})
        )
        .then(({playlist, trackMap}) =>
          // map through the playlist again to sort the track in order
          playlist.map(trackId => trackMap[trackId])
        )
        // send the ordered track
        .then(orderedTrack => res.json(orderedTrack))
  )
)

// update playlist
// might need to parse req.body
router.put('/:channelId/playlist', (req, res, next) =>
  Channel.findById(req.params.channelId)
    .then(channel => channel.update({playlist: req.body.playlist}))
    .then(() => res.send(200))
    .catch(next)
)
