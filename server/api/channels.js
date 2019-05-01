const router = require('express').Router()
const {User, Channel, Song, Message} = require('../db/models')
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
  console.log(req.body)
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
      include: [{model: User, as: 'owner'}, {model: Message, include: [{model: User}]}]
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
  Channel.findById(req.params.channelId, {attributes: ['playlist']})
    .then(
      // find all song associated with the channel by their id
      ({playlist}) =>
        Song.findAll({
          where: {
            id: {
              [Op.or]: [...playlist]
            }
          },
          attributes: ['title', 'album', 'artist', 'id', 'uri']
          // returned the found tracks and the playlist order
        }).then(unorderedTracks => ({playlist, unorderedTracks}))
    )
    // we need to reorder them before returning
    .then(({playlist, unorderedTracks}) =>
      // create map of track: reduces the playlist array to object of key/value
      ({playlist, trackMap: unorderedTracks.reduce(trackMapReducer, {})})
    )
    .then(({playlist, trackMap}) =>
      // map through the playlist again to sort the track in order
      playlist.map(trackId => trackMap[trackId])
    )
    // send the ordered track
    .then(orderedTrack => res.json(orderedTrack))
)

// update playlist
// might need to parse req.body
router.put('/:channelId/playlist', async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.channelId)
    channel.update({playlist: req.body.playlist})
    res.send(200)
  } catch (err) {
    next(err)
  }
})
