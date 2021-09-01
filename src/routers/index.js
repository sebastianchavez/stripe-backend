  
const express = require('express')
const router = express.Router()

// Ruta de orders

router.use('/orders', require('./orders'))


module.exports = router