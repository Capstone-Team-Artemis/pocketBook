const Sequelize = require('sequelize')
const db = require('../db')

// userId column is who is attending the event, NOT the host!!
const UserEvent = db.define('userEvent', {
    host: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = UserEvent