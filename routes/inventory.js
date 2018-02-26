const express = require('express')
const router = express.Router()

// Model import
const Inventory = require('../models/inventory')
const Barcode = require('../models/barcode')

router.route('/')
  .get(async (req, res) => {
    try {
      const inventory = await Inventory
        .find()
        .populate('product')
        .exec()
      res.json(inventory)
    }
    catch (err) {
      res.status(500).send(err)
    }
  })
  .post(async (req, res) => {
    console.group('Received an inventory POST request')
    console.info(`This is the request body: ${JSON.stringify(req.body)}`)
    console.groupEnd()

    let item = new Inventory({
      product: req.body.productId,
      quantity: req.body.quantity,
    })

    try {
      const newItem = await item.save()
      res.json({
        message: "Inventory item created",
        item: item
      })
    }
    catch (err) {
      res.status(500).send(err)
    }
  })

router.route('/item/:barcode_code')
  .get(async (req, res) => {
    try {
      const barcode = await Barcode.findOne({ code: req.params.barcode_code })
      const item = await Inventory
        .findOne({ product: barcode._id })
        .populate('product')
        .exec()
      res.json(item)
    }
    catch (err) {
      res.status(500).send(err)
    }
  })
  .put(async (req, res) => {
    try {
      const barcode = await Barcode.findOne({ code: req.params.barcode_code })
      let item = await Inventory.findOne({ product: barcode._id })

      item.quantity = item.quantity + 1

      const newItem = await item.save()
      
      res.json({
        message: "Item updated",
        item: item
      })
    }
    catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = router