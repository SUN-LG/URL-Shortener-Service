module.exports = function (app) {
  app.get('/', (req, res) => {
    res.send('Hello World')
  })
  app.use('/new', require("./new"))
  app.use((req, res) => {
    if (!res.headersSent) res.status(404).send('404 - NotFound')
  })
}