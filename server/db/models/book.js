const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
    //check if it is string or other types
    googleId: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    authors: {
        type: Sequelize.ARRAY
    },
    rating: {
        type: Sequelize.FLOAT
    },
    description: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.TEXT,
        defaultValue: 'placeholder.jpg'
    }

})

module.exports = Book
