//create router instance

const router = require('express').Router();
module.exports = router
//api/users
router.use('/users', require('./users'))
//api/books
router.use('/books', require('./books'))
//api/events
router.use('/events', require('./events'))

//handle 404
router.use((req, res, next) => {
    const error = new Error('page not found!')
    error.status = 404;
    next(error)
})
