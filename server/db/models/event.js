const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
    eventTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    startTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    endTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    hostId: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Event