const Sequelize = require('sequelize')
const db = require('../db')

// Address is saved in all upper case.

const Address = db.define('address', {
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[a-z]+$', 'i']
    },
    set(val) {
      this.setDataValue(
        'city',
        val
          .split(' ')
          .join()
          .toUpperCase()
      )
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[a-z]+$', 'i']
    },
    set(val) {
      this.setDataValue(
        'state',
        val
          .split(' ')
          .join()
          .toUpperCase()
      )
    }
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ['^[a-z]+$', 'i']
    },
    set(val) {
      this.setDataValue(
        'country',
        val
          .split(' ')
          .join()
          .toUpperCase()
      )
    }
  }
})

module.exports = Address
