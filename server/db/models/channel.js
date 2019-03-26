const Sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/300/300/?blur'
  }
})

module.exports = Channel
