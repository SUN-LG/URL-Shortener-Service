const express = require("express")
const router = express.Router()
const UrlShortener = require("../models/url-shortener")

router.get(/(https?|ftp|file):\/\/[A-Za-z0-9-+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, function(req, res, next) {
  console.log('get 1')
  const originalUrl = req.path.slice(1)

  UrlShortener.findOne({
      original_url: originalUrl
    })
    .exec((err, urlShortener) => {
      if (err) throw err
      if (urlShortener) return res.json(urlShortener)
      UrlShortener.create({
        original_url: originalUrl
      }, (err, urlShortener) => {
        if (err) throw err
        res.json(urlShortener)
      })
    })
})

router.get('/:shortUrl', (req, res) => {
  console.log('get 2')
  const shortUrl = req.params.shortUrl
  UrlShortener.findOne({
      short_url: shortUrl
    })
    .exec((err, urlShortener) => {
      if (err) throw err
      if (!urlShortener) return res.json({
        error: 'URL invalid'
      })
      res.redirect(urlShortener.original_url)
    })
})

router.get('/*', (req, res) => {
  console.log('get 3')
  if (req.query.invalid !== 'true') res.json({
    error: 'URL invalid'
  })
  const originalUrl = req.path.slice(1)
  res.json({
    original_url: 'invalid',
    short_url: 'invalid'
  })
})

module.exports = router
