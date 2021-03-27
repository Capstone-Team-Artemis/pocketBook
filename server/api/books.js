const router = require("express").Router();
const { Book, User, UserBook } = require("../db/models");

module.exports = router;

//GET api/books

// router.get('/', async (req, res, next) => {
//     try {

//     } catch (err) {
//         next (err)
//     }
// )}

router.get("/:googleId", async (req, res, next) => {
  try {
    const book = await Book.findOne({
      where: {
        googleId: req.params.googleId,
      },
    });
    //remove line 24 when login is implemented
    const kay = await User.findOne({ where: { email: "kay@pocketbook.com" } });
    const userBook = await UserBook.findOne({
      where: {
        //req.user.id
        userId: kay.id,
        bookId: book.id,
      },
    });
    res.send(userBook.status);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const [book] = await Book.findOrCreate({
      where: {
        googleId: req.body.book.googleId,
      },
      defaults: req.body.book,
    });

    //hard coded
    const kay = await User.findOne({ where: { email: "kay@pocketbook.com" } });
    await kay.addBook(book, { through: { status: req.body.status } });
    // await req.user.addBook(book, { through: { status: req.body.status } });
    res.send(book);
  } catch (error) {
    next(error);
  }
});
