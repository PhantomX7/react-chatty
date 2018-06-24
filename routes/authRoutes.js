const express = require('express');
const router = express.Router();

const jwt = require('jwt-simple');
const User = require('../models/user');
const passportService = require('../services/passport');
const passport = require('passport');
const requireSignin = passport.authenticate('local', { session: false });

const chatkit = require('../tools/chatkit');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log(user.id);
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

router.post('/signin', requireSignin, (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide username and password' });
  }

  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Username exist!!' });
    }
    const user = new User({
      username,
      password,
    });
    user.save(err => {
      if (err) {
        return next(err);
      }

      chatkit
        .createUser({
          id: user.username,
          name: user.username,
        })
        .then(() => {
          res.json({ token: tokenForUser(user) });
        });
    });
  });
});

module.exports = router;
