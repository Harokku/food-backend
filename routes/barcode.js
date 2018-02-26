const express = require('express')
const router = express.Router()

// Models import
const Barcode = require('../models/barcode')

router.route('/')
  .get((req, res) => {
    Barcode.find((err, barcodes) => {
      if (err) {
        res.send(err)
      }
      res.json(barcodes)
    })
  })
  .post((req, res) => {
    console.group('Received a barcode POST request')
    console.info(`This is the request body: ${JSON.stringify(req.body)}`)
    console.groupEnd()

    let barcode = new Barcode()
    barcode.code = req.body.code
    barcode.category = req.body.category
    barcode.manufacturer = req.body.manufacturer
    barcode.product = req.body.product
    barcode.measureUnit = req.body.measureUnit
    barcode.quantity = req.body.quantity

    barcode.save((err, barcode) => {
      if (err) {
        res.send(err)
      }
      res.json({
        message: "Barcode created",
        barcode: barcode
      })
    })
  })

router.route('/:barcode_code')
  .get((req, res) => {
    Barcode.findOne({ code: req.params.barcode_code }, (err, barcode) => {
      if (err) {
        res.send(err)
      }
      res.json(barcode)
    })
  })

module.exports = router