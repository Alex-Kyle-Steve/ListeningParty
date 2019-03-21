const Sequelize = require('sequelize')
const db = require('../db')

const Song = db.define('song', {
  spotifyId: Sequelize.STRING,
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
  releaseYear: Sequelize.INTEGER,
  length: {
    type: Sequelize.INTEGER,
    get() {
      const inSecs = this.getDataValue('length')
      let secs = inSecs % 60
      secs =
        secs > 10 ? secs.toString() : secs > 0 ? `0${secs.toString()}` : '00'
      return `${Math.floor(inSecs / 60) % 60}:${secs}`
    }
  },
  track: Sequelize.INTEGER,
  albumArt: Sequelize.BLOB
})

module.exports = Song
