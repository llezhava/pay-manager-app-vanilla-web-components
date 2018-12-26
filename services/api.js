const mockData = require('./mockData')

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