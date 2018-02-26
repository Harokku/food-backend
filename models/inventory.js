const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Inventory = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Barcode",
        required: true
    },
    quantity: {type: Number, required: true}
})

module.exports = mongoose.model('Inventory', Inventory)