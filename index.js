const express = require("express")
const routes = require("./app/routes/index.js")
const mongoose = require("mongoose")
const Counter = require("./app/models/count")

const app = express()
require("dotenv").load()

mongoose.connect(process.env.MONGO_URI)
mongoose.Promise = global.Promise

Counter.findOne({_id: 'url_count'})
  .exec((err, counter) => {
    if (err) throw err
    if (!counter) return new Counter({_id: 'url_count'}).save()
    return console.log(counter)
  })

app.use('/public', express.static(process.cwd() + '/plublic'))

routes(app)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Inertnal Error')
})
const port = process.env.PORT || 8080
app.listen(port, function () {
  console.log('server listening on port:' + port)
})