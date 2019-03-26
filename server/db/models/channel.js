const Sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  // playlist is an array of integer consisting of trackId
  playlist: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/300/300/?blur'
  }
})

module.exports = Channel
