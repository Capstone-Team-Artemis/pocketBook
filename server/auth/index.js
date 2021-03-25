const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// POST auth/login
router.post('/login', async (req, res, next) => {
  try {
    // Find user using the inputted email
    const user = await User.findOne({ where: { email: req.body.email } });
    // If can't find user, do this:
    if (!user) {
      console.log('No such user found with:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for email:', req.body.email);
      res.status(401).send('Wrong username and/or password');
      // If can find user, login!
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

// POST auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    // Try creating the user & logging them in
    const user = await User.create(req.body);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    // Else, if we get this error, user exists
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// POST auth/logout
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
