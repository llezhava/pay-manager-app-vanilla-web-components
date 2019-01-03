const models = require('../models')


async function categories(req, res) {
    let categories = await models.Category.findAll({attributes: ['id', 'name'], raw: true})
    console.log(categories)
    res.json(categories)
}



async function payments(req, res) {
    let filters = req.body
    let payments = await models.Record.findAll({raw: true})
    // console.log(filters, payments)
    res.json(payments)
}

module.exports = {
    categories, payments
}