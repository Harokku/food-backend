const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

// Routes imports
const docs = require('./routes/docs')
const barcode = require('./routes/barcode')

// Mongo DB config
const mongoDB = 'mongodb://food:food@ds247078.mlab.com:47078/food-storage'
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.info(`Connected to DataBase: ${db.db.databaseName}`)
})

//Endpoint Config
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.group('server started!')
  console.info(`listening on port: ${port}`)
  console.groupEnd()
})

app.use((req, res, next) => {
  console.group('New request received:')
  console.log(req.method, req.url)
  console.groupEnd()

  next()
})

app.use('/docs', docs)
app.use('/api/barcode', barcode)

/*********************************/
/*     EndPoint test funct       */
/*********************************/

/**
 * @description Endpoint test
 * @returns {string} Sample text
 */
app.get('/', (req, res) => {
  res.send('Reached the food-backend, visit /docs for readme')
})