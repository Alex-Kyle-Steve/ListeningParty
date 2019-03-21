const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  spotifyId: Sequelize.STRING,
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  releaseYear: Sequelize.INTEGER,
  length: Sequelize.INTEGER,
  track: Sequelize.INTEGER,
  albumArt: Sequelize.BLOB
})

module.exports = Song
