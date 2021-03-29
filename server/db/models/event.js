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
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
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