const orders = require('../../models/orders')
const { generatePaymentIntent, generatePaymentMethod } = require('../../services/stripe')

// Buscamos orden y genramos intencion de pago

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.body

        // Buscamos orden en nuestra base de datos

        const resOrder = await orders.findOne({ localizator: id })

        // Generamos metodo de pago en Stripe

        console.log('token:', token)
        console.log('id:', id)
        const responseMethod = await generatePaymentMethod(token) // 🔴 Token magico!

        // Generamos intencion de pago

        const resPaymentIntent = await generatePaymentIntent(
            {
                amount: resOrder.amount,
                user: resOrder.name,
                payment_method: responseMethod.id
            }
        )

        // Actualizamos  orden con id de intencion de pago
        await orders.findOneAndUpdate({ localizator: id }, {
            stripeId: resPaymentIntent.id
        })

        res.send({ data: resPaymentIntent })

    } catch (e) {
        console.log(e.message)
        res.status(500);
        res.send({ error: 'Algo ocurrio' })
    }
}

module.exports = { updateItem }