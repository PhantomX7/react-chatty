const express = require('express');
const router = express.Router();

const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, (req, res) => {
  res.send({ message: 'HAHAHA' });
});

router.get('/me', requireAuth, (req, res) => {
  const { username, _id } = req.user;
  res.send({ id: _id, username });
});

module.exports = router;
