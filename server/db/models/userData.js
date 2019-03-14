const Sequelize = require('sequelize')
const db = require('../db')

const UserData = db.define('userData', {
  placeHolder: Sequelize.STRING
})

module.exports = UserData
