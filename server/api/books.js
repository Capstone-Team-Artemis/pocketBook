const router = require('express').Router();
const { Book, User, UserBook } = require('../db/models');

module.exports = router;

//GET /api/googleId - Sets current status of User's book status on
//single book page view
router.get('/:googleId', async (req, res, next) => {
  try {
    //Finds book in Book model by googleId
    const book = await Book.findOne({
      where: {
        googleId: req.params.googleId,
      },
    });
    //remove line below when login is implemented (hard coded until login is funcional)
    const kay = await User.findOne({ where: { email: 'kay@pocketbook.com' } });
    //Finds book with specific user
    const userBook = await UserBook.findOne({
      where: {
        //req.user.id
        userId: kay.id,
        bookId: book.id,
      },
    });
    //Sends book status
    res.send(userBook.status);
  } catch (error) {
    next(error);
  }
});

//POST /api - Creates book in db and sets book status to specific login user
router.post('/', async (req, res, next) => {
  try {
    const [book] = await Book.findOrCreate({
      where: {
        //Finds by googleId
        googleId: req.body.book.googleId,
      },
      //or creates - adds book in db
      defaults: req.body.book,
    });

    //hard coded
    const kay = await User.findOne({ where: { email: 'kay@pocketbook.com' } });
    //uses magic method addBook to set status in userBooks model
    await kay.addBook(book, { through: { status: req.body.status } });
    // await req.user.addBook(book, { through: { status: req.body.status } });
    res.send(book);
  } catch (error) {
    next(error);
  }
});
