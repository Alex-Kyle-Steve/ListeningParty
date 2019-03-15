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
    callbackURL: 'http://localhost:8080/auth/spotify/callback'
  }
  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, profile, done) => {
      // const name = profile.displayName
      console.log(profile)
      const spotifyId = profile.id
      User.findOrCreate({
        where: {spotifyId},
        defaults: {
          accessToken: accessToken,
          refreshToken: refreshToken
        }
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: [
        'user-read-recently-played',
        'user-read-email',
        'playlist-modify-public',
        'user-library-read',
        'playlist-read-collaborative',
        'user-read-birthdate',
        'user-read-playback-state',
        ' user-modify-playback-state',
        'user-top-read',
        'user-read-currently-playing',
        'user-follow-modify'
      ],
      showDialog: true
    })
  )

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
