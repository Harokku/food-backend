const categories = require('../utils/categories')
const measures = require('../utils/measureUnits')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BarcodeSchema = new Schema({
  code: {type: String, required: true, trim: true, unique: true},
  category: {type: String, required: true, enum: categories.categories},
  manufacturer: {type: String, required: true},
  product: {type: String, required: true},
  measureUnit: {type: String, required: true, enum: measures.measureUnits},
  quantity: {type: Number, required: true},
})

module.exports = mongoose.model('Barcode', BarcodeSchema)