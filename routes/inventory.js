const express = require('express')
const router = express.Router()

// Model import
const Inventory = require('../models/inventory')
const Barcode = require('../models/barcode')

router.route('/')
  .get((req, res) => {
    Inventory
      .find()
      .populate('product')
      .exec((err, inventory) => {
        if (err) {
          res.send(err)
        }
        res.json(inventory)
      })
  })
  .post((req, res) => {
    console.group('Received an inventory POST request')
    console.info(`This is the request body: ${JSON.stringify(req.body)}`)
    console.groupEnd()

    let item = new Inventory()
    item.product = req.body.productId
    item.quantity = req.body.quantity

    item.save((err, item) => {
      if (err) {
        res.send(err)
      }
      res.json({
        message: "Inventory item created",
        item: item
      })
    })
  })

router.route('/item/:barcode_code')
  .get((req, res) => {
    Barcode.findOne({ code: req.params.barcode_code }, (err, barcode) => {
      if (err) {
        res.send(err)
      }
      Inventory
        .findOne({ product: barcode._id })
        .populate('product')
        .exec((err, item) => {
          if (err) {
            res.send(err)
          }
          res.json(item)
        })
    })
  })
  .put((req, res) => {
    Barcode.findOne({ code: req.params.barcode_code }, (err, barcode) => {
      if (err) {
        res.send(err)
      }
      Inventory.findOne({ product: barcode._id }, (err, item) => {
          if (err) {
            res.send(err)
          }
          item.quantity = item.quantity +1
          
          item.save((err, item) => {
            if (err) {
              res.send(err)
            }
            res.json({
              message: "Item updated",
              item: item
            })
          })
        })
    })
  })

module.exports = router