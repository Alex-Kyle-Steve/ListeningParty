const Sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  // playlist is an array of integer consisting of trackId
  playlist: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }
})

module.exports = Channel
