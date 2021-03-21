const Sequelize = require('sequelize')
const db = require('../db')

const UserBook = db.define('userBook', {
    status: {
        type: Sequelize.ENUM('Completed', 'Currently Reading', 'To Read')
    },
})

module.exports = UserBook