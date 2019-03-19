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
    callbackURL: '/auth/spotify/callback'
  }
  const strategy = new SpotifyStrategy(
    spotifyConfig,
    (accessToken, refreshToken, expires_in, profile, done) => {
      // const name = profile.displayName
      const spotifyId = profile.id
      User.findOrCreate({
        where: {spotifyId}
      })
        .then(([user]) => {
          user.update({
            accessToken: accessToken,
            refreshToken: refreshToken,
            expires_in: expires_in
          })
          return user
        })
        .then(user => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: [
        'streaming',
        'user-read-private',
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

  router.get('/token', (req, res, next) => {
    req.user && req.user.accessToken
      ? res.send({
          accessToken: req.user.accessToken,
          refreshToken: req.user.refreshToken
        })
      : res.send()
  })

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}
