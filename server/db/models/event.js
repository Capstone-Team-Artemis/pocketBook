const Sequelize = require('sequelize')
const db = require('../db')
//import the built in data types 
const { DataTypes } = require('sequelize')
//later think about having the calender dropdown
// Sequalize.TIME? Sequalize.DATE?
const Event = db.define('event', {
    eventTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    time: {
        type: DataTypes.STRING,
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
    }
})

module.exports = Event