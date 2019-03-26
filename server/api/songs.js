const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allSongs = await Song.findAll()
    res.json(allSongs)
  } catch (err) {
    next(err)
  }
})
router.get('/:songId', async (req, res, next) => {
  try {
    const selectedSong = await Song.findById(req.params.songId)
    res.json(selectedSong)
  } catch (err) {
    next(err)
  }
})

router.post('/', ({body: {title, artist, album, uri}}, res, next) =>
  Song.findOrCreate({
    where: {uri},
    defaults: {title, artist, album, uri}
  }).then(created => res.send(created[0]))
)
