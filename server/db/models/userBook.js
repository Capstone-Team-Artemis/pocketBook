const Sequelize = require('sequelize')
const db = require('../db')

const UserBook = db.define('userbook', {
    status: {
        type: Sequelize.ENUM('Completed', 'Currently Reading', 'To Read')
    },
    allowNull: false
})

module.exports = UserBook