const getMonthData = require('./getMonthData')
const getCategoryData = require('./getCategoryData')

async function getMonthChart(req, res) {
    let filters = req.body

    let data = getMonthData(filters)

    res.json(data)
}

async function getCategoryChart(req, res) {
    let filters = req.body

    let data = getCategoryData(filters)

    res.json(data)
}

module.exports = {
    getMonthChart,
    getCategoryChart
}