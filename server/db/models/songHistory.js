const Sequelize = require('sequelize')
const db = require('../db')

const SongHistory = db.define('songHistory', {
  listenedDate: Sequelize.DATE,
  listenedDuration: Sequelize.TIME
})

module.exports = SongHistory
