const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup, login, googleSuccess ,facebookSuccess} = require('../controllers/authController');


router.post('/signup', signup);
router.post('/login', login);

//Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleSuccess
);


// // Facebook
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get('/facebook/callback',
//   passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
//   facebookSuccess
// );

module.exports = router;
