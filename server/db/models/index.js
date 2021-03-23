const Book = require('./book')
const User = require('./user')
const Event = require('./event')
const UserBook = require('./userBook')
const UserEvent = require('./userEvent')

// association
// user has many book/ book has many user
User.belongsToMany(Book, {through: UserBook})
Book.belongsToMany(User, {through: UserBook})

//User belongs to many Event / Event belongs to many User
User.belongsToMany(Event, {through: UserEvent})
Event.belongsToMany(User, {through: UserEvent})

module.exports = {
    User, 
    Book,
    Event,
    UserBook,
    UserEvent,
}

