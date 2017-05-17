const mongoose = require("mongoose")
const Schema = mongoose.Schema
const convert2Base64 = require("../utils/convert2Base64")
const Counter = require("./count")

const UrlShortenerSchema = new Schema({
  _id: {type: Number, index: true},
  original_url: String,
  short_url: String,
  created_at: Date
})

UrlShortenerSchema.pre('save', function (next) {
  const doc = this
  Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}})
    .exec((err, counter) => {
      if (err) return next(err)
      doc.created_at = new Date()
      doc._id = counter.seq
      doc.short_url = convert2Base64(+counter.seq)
      next()
    })
})


const UrlShortener = mongoose.model('UrlShortener', UrlShortenerSchema)

module.exports = UrlShortener