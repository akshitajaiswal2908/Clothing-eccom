const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models');
require('dotenv').config();
//google
passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ where: { email } });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
//facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          name: profile.displayName,
          email
        });
      }
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }
));


passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});
module.exports = passport;
