const router = require('express').Router();
const { User, Book, UserBook} = require('../db/models');
module.exports = router

//GET SINGLE USER and roads all books
//GET api/users/userId

router.get('/:userId', async (req, res, next) => {
    try {
        // const user = await User.findOne({
        //     where: {
        //         id: req.params.userId
        //     },
        //     include: Book
        // })

        const user = await User.findByPk(req.params.userId)
        res.status(200).send(user)

    } catch (error) {
        next(error)
    }
})

// Create GET route to generate books by status
router.get("/:userId/:status", async (req, res, next) => {
    try {
        let userId = req.params.userId
        // status would be Currently Reading, To Read, or Completed
        let status = req.params.status
        const myBooks = await UserBook.findAll({
                where: {userId: userId, status: status},
                include: Book
        })
        //check if more than one book saved
        if (myBooks.length>=1) {
            res.status(200).send(myBooks)
        } else {
            res.send(`No books saved in ${status}`)
        }
    } catch (error) {
        next(error)
    }
})

// Create DELETE route to delete a selected book
// DELETE api/users/userId/bookId
router.delete('/:userId/:bookId', async (req, res, next) => {
    try {
        let userId = req.params.userId
        let bookId = req.params.bookId
        const myBooks = await User.findByPk(userId)
        const book = await Book.findByPk(bookId)
        await myBooks.removeBook(book)
        res.status(200).send(`${bookId} was removed`)
        
    } catch (error) {
        next(error)
    }
})