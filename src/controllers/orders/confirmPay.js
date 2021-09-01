const orders = require('../../models/orders')
const { confirmPaymentIntent } = require('../../services/stripe')

//TODO: Buscamos orden y genramos intencion de pago

const confirmPay = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.body

        //TODO: Buscamos orden en nuestra base de datos

        const resOrder = await orders.findOne({ localizator: id })

        //TODO: Confirmamos pago en Stripe
        const respConfirm = await confirmPaymentIntent(resOrder.stripeId, token)

        console.log('respConfirm:', respConfirm)

        //TODO: Actualizamos  orden con id de intencion de pago
        await orders.findOneAndUpdate({ localizator: id }, {
            status: 'success'
        })

        res.send({ data: respConfirm })

    } catch (e) {
        console.log(e.message)
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}

module.exports = { confirmPay }