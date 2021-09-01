const orders = require('../../models/orders')
const { getPaymentDetail, confirmPaymentIntent } = require('../../services/stripe')

// Buscamos orden y y solictamos a stripe los detalles

const checkItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscamos orden en nuestra base de datos

        const resOrder = await orders.findOne({ localizator: id })

        // Solicitamos a stripe que nos devuelva la informacion de la orden

        const detailStripe = await getPaymentDetail(resOrder.stripeId)
        console.log('detailStripe:', detailStripe)

        const status = detailStripe.status.includes('succe') ? 'success' : 'fail'

        // Actualizamos nuestra orden con el estatus

        await orders.findOneAndUpdate({ localizator: id }, { status })

        res.send({ data: detailStripe })

    } catch (e) {
        console.log(e.message)
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}

module.exports = { checkItem }