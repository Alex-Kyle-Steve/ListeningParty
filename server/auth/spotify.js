const SpotifyStrategy = require('passport-spotify').Strategy
const {User} = require('../db/models')
const passport = require('passport')
const router = require('express').Router()
require('../../secrets')
module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('SPOTIFY client ID / secret not found. Skipping SPOTIFY OAuth.')
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }
  const strategy = new SpotifyStrategy(
    {
      clientID: spotifyConfig.clientID,
      clientSecret: spotifyConfig.clientSecret,
      callbackURL: spotifyConfig.callbackURL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({spotifyId: profile.id}, function(err, user) {
        return done(err, user)
      })
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('spotify', {scope: 'email'}))

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
