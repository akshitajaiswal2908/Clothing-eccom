const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, googleSuccess } = require('../controllers/authController');


router.post('/signup', signup);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleSuccess
);

module.exports = router;
