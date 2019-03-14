const Sequelize = require('sequelize')
const db = require('../db')

const HistoricalPlayList = db.define('historicalPlayList', {
  datePlayed: Sequelize.DATE
})

module.exports = HistoricalPlayList
