const Sequelize = require('sequelize')
const db = require('../db')
const { DataTypes } = require('sequelize')

const Book = db.define('book', {
    //check if it is string or other types
    googleId: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    authors: {
        type: Sequelize.ARRAY(DataTypes.STRING)
    },
    rating: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: 'https://picsum.photos/200/300'
    }

})

module.exports = Book
