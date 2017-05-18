const express = require("express")
const router = express.Router()
const UrlShortener = require("../models/url-shortener")
const Counter = require("../models/count")
const convert2Base64 = require("../utils/convert2Base64")

router.get(/(https?|ftp|file):\/\/[A-Za-z0-9-+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/, function(req, res, next) {
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
        res.json({
          original_url: urlShortener.original_url,
          short_url: process.env.WEBURL + urlShortener.short_url
        })
      })
    })
})

router.get('/*', (req, res) => {
  if (req.query.allow !== 'true') return res.json({
    error: 'URL invalid'
  })
  const originalUrl = req.path.slice(1)
  Counter.findOne({_id: 'url_count'})
    .exec((err, counter) => {
      if (err) throw err
      const id = counter.seq + 1
      res.json({
        original_url: 'invalid',
        short_url: process.env.WEBURL + '---------' + convert2Base64(id)
      })
    })
})

module.exports = router
