const express = require('express')
const router = express.Router()

const { getItem } = require('../controllers/orders/getItem')
const { postItem } = require('../controllers/orders/postItem')
const { updateItem } = require('../controllers/orders/updateItem')
const { checkItem } = require('../controllers/orders/checkItem')
const { confirmPay } = require('../controllers/orders/confirmPay')

//TODO:(1) Genarar nueva orden!

router.post('/', postItem)

//TODO:(2) Obtener el detalle de una orden

router.get('/:id', getItem)

//TODO:(3) Generar intencion de pago

router.patch('/:id', updateItem)

//TODO:(4) Confirmar estatus del pago

router.patch('/confirm/:id', checkItem)

//TODO:(5) Confirmar pago pago

router.patch('/confirm-pay/:id', confirmPay)

module.exports = router