const express = require("express")
const router = express.Router()
const UrlShortener = require("../models/url-shortener")

router.get(/(https?|ftp|file):\/\/[A-Za-z0-9-+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, function (req, res, next) {
    const originalUrl = req.path.slice(1)
    
    UrlShortener.findOne({original_url: originalUrl})
      .exec((err, urlShortener) => {
        if (err) throw err
        if (urlShortener) return res.json(urlShortener)
        UrlShortener.create({original_url: originalUrl}, (err, urlShortener) => {
          if (err) throw err
          res.json(urlShortener)
        })
      })
})
router.get('/*', (req, res) => {
  if (req.query.invalid !== 'true') res.json({error: 'URL invalid'})
  const originalUrl = req.path.slice(1)
  res.json({
    original_url: 'invalid',
    short_url: 'invalid'
  })
})

module.exports = router