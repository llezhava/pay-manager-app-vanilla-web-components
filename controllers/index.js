const models = require('../models')


async function categories(req, res) {
    let categories = await models.Category.findAll({attributes: ['id', 'name'], raw: true})
    console.log(categories)
    res.json(categories)
}



async function payments(req, res) {
    let filters = req.body
    const options = {
        raw: true,
        attributes: ['title', 'amount', 'date', 'comment'],
        include: [
            {model: models.Category}
        ]
    }
    let payments = await models.Record.findAll(options)

    let newPayments = payments.map(payment => {
        let {title, amount, date, comment} = payment
        return {
            title, 
            amount,
            date, 
            comment,
            category: payment['category.name']
        }
    })
    res.json(newPayments)
}

module.exports = {
    categories, payments
}