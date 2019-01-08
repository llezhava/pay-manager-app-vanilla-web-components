const getMonthData = require('./getMonthData')
const getCategoryData = require('./getCategoryData')

async function getMonthChart(req, res) {
    let filters = req.body

    console.log("xxxxxx")

    let data = await getMonthData(filters)

    res.json(data)
}

async function getCategoryChart(req, res) {
    let filters = req.body

    let data = await getCategoryData(filters)

    res.json(data)
}

module.exports = {
    getMonthChart,
    getCategoryChart
}