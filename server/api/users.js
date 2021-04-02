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
    let userId = req.params.userId;
    console.log(userId);
    const myBooks = await UserBook.findAll({
      where: { userId: userId },
      include: Book,
    });
    res.status(200).send(myBooks);
  } catch (error) {
    next(error);
  }
});

// Create GET route to generate books by status
router.get('/:userId/image', async (req, res, next) => {
  try {
    let userId = req.params.userId;
    const user = await User.findAll({
      where: { id: userId },
    });
    res.status(200).send(user[0].dataValues);
  } catch (error) {
    next(error);
  }
});

// PUT api/users/:userId route to set custom image
router.put('/:userId/', async (req, res, next) => {
  try {
    const result = await User.update(
      {
        image: req.body.image,
      },
      {
        where: {
          id: req.params.userId,
        },
      }
    );
    if (result) {
      res.status(200).json(req.body.image);
    }
  } catch (err) {
    next(err);
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
