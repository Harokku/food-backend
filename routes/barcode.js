const express = require('express')
const router = express.Router()

// Models import
const Inventory = require('../models/inventory')
const Barcode = require('../models/barcode')

router.route('/')
  .get(async (req, res) => {
    try {
      const barcodes = await Barcode.find()
      res.json(barcodes)
    }
    catch (err) {
      res.status(500).send(err)
    }
  })
  .post(async (req, res) => {
    console.group('Received a barcode POST request')
    console.info(`This is the request body: ${JSON.stringify(req.body)}`)
    console.groupEnd()

    const barcode = new Barcode({
      code: req.body.code,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      product: req.body.product,
      measureUnit: req.body.measureUnit,
      quantity: req.body.quantity
    })

    try {
      const newBarcode = await barcode.save()
      const item = new Inventory({
        product: newBarcode._id,
        quantity: 1,
      })
      const newItem = await item.save()
      res.status(201).json({
        message: "Barcode created",
        barcode: newBarcode,
        inventoryNumber: newItem._id
      })
    }
    catch (err) {
      res.status(500).send(err)
    }
  })

router.route('/:barcode_code')
  .get(async (req, res) => {
    try {
      const barcode = await Barcode.findOne({ code: req.params.barcode_code })
      res.json(barcode)
    }
    catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = router