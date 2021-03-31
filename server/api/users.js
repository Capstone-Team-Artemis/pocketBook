const router = require('express').Router();
const { User, Book, UserBook } = require('../db/models');
module.exports = router;

//GET api/users
// router.get('/:userId', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId, {
//       include: Book
//     });
//     res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// Create GET route to generate books by status
router.get('/:userId', async (req, res, next) => {
  try {
    //find all books associated with the user in UserBook through table
    let userId = req.params.userId
    console.log(userId)
    const myBooks = await UserBook.findAll({
      where: { userId: userId},
      include: Book,
    });
    res.status(200).send(myBooks);

  } catch (error) {
    next(error);
  }
});

// Create DELETE route to delete a selected book
// DELETE api/users/userId/bookId
router.delete('/:userId/:bookId', async (req, res, next) => {
  try {
    let userId = req.params.userId;
    let bookId = req.params.bookId;
    const myBooks = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);
    await myBooks.removeBook(book);
    res.status(200).send(`${bookId} was removed`);
  } catch (error) {
    next(error);
  }
});
