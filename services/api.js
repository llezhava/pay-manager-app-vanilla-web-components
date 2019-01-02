const mockData = require('./mockData')
const models = require('./../models')

function categories(req, res) {
    res.json(mockData.categories)
}

function payments(req, res) {
    let filters = req.body
    res.json(mockData.payments)
}

module.exports = {
    categories, payments
}