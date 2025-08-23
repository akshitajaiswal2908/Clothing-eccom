const express = require('express');
const router = express.Router();
const passport = require('passport');
const { signup,  googleSuccess, facebookSuccess, verifyEmail ,forgotPassword, resetPassword , sendOTP , verifyOTP} = require('../controllers/authController');

router.post('/signup', signup);
router.get('/verify/:token', verifyEmail);
// router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  googleSuccess
);

// Facebook login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
  facebookSuccess
);

module.exports = router;
