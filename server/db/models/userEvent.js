const Sequelize = require('sequelize')
const db = require('../db')

const UserEvent = db.define('userEvent', {
    attending: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    allowNull: false
})

module.exports = UserEvent