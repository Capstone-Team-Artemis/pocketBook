const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
    eventTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
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
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hostId: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Event