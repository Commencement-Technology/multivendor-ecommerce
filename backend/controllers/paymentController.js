const striptModel = require('../models/stripeModel')
const sellerModel = require('../models/sellerModel')
const { responseReturn } = require('../utiles/response')
const { v4: uuidv4 } = require('uuid')
const stripe = require("stripe")(
    "sk_test_51N8amPIt63Wcx3eVr72l77kfPTDgInVEaTT9d4G1JgngM0YEgAIwocli1hC0sKidMuzPiUNimOpqxXtIKeFkhnQo00EQgFUaDA"
);
class paymentController {
    create_stripe_connect_account = async (req, res) => {
        const { id } = req
        const uid = uuidv4()

        try {
            const stripInfo = await striptModel.findOne({ sellerId: id })

            if (stripInfo) {
                await striptModel.deleteOne({ sellerId: id })
                const account = await stripe.accounts.create({ type: 'express' })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:3000/refresh',
                    return_url: `http://localhost:3000/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                })
                await striptModel.create({
                    sellerId: id,
                    stripeId: account.id,
                    code: uid
                })
                responseReturn(res, 201, { url: accountLink.url })
            } else {
                const account = await stripe.accounts.create({ type: 'express' })

                const accountLink = await stripe.accountLinks.create({
                    account: account.id,
                    refresh_url: 'http://localhost:3000/refresh',
                    return_url: `http://localhost:3000/success?activeCode=${uid}`,
                    type: 'account_onboarding'
                })
                await striptModel.create({
                    sellerId: id,
                    stripeId: account.id,
                    code: uid
                })
                responseReturn(res, 201, { url: accountLink.url })
            }
        } catch (error) {
            console.log('stripe connect account create error ' + error.message)
        }
    }

    active_stripe_connect_account = async (req, res) => {
        const { activeCode } = req.params
        const { id } = req
        try {
            const userStripeInfo = await striptModel.findOne({ code: activeCode })
            if (userStripeInfo) {
                await sellerModel.findByIdAndUpdate(id, {
                    payment: 'active'
                })
                responseReturn(res, 200, { message: 'payment active' })
            } else {
                responseReturn(res, 404, { message: 'payment active failed' })
            }
        } catch (error) {
            responseReturn(res, 500, { message: 'Internal server error' })
        }
    }
}

module.exports = new paymentController()