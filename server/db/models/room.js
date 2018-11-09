const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  roomName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sessionId: {
    type: Sequelize.TEXT
  },
  roomImg: {
    type: Sequelize.STRING,
    defaultValue:
      'http://media.boingboing.net/wp-content/uploads/2017/03/surprised-cat-04.jpg'
  }
})

module.exports = Room
