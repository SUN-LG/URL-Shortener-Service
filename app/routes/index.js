const UrlShortener = require("../models/url-shortener")

function createWEBURL(req, res, next) {
  const WEBURL = req.protocol + '://' + req.get('host') + '/'
  process.env.WEBURL = WEBURL
  next()
}

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl
    UrlShortener.findOne({
        short_url: shortUrl
      })
      .exec((err, urlShortener) => {
        if (err) throw err
        if (!urlShortener) return res.json({
          error: 'No short url found for given input'
        })
        res.redirect(urlShortener.original_url)
      })
  })
  app.use('/new', createWEBURL, require("./new"))
  app.use((req, res) => {
    if (!res.headersSent) res.status(404).send('404 - NotFound')
  })
}
