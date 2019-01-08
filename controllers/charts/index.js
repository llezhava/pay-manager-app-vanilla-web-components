const models = require('../../models')
const getFilters = require('../filters')
const _ = require('lodash')

function groupByMonths(data) {
    console.log(data)
}

async function getMonthChart(req, res) {
        let filters = req.body
        const options = {
            raw: true,
            attributes: ['amount', 'date'],
            where: getFilters(filters),
            order: [['date', 'DESC']],
            include: [{
                model: models.Category
            }]
        }

        let records;

        try {
            records = await models.Record.findAll(options)
        } catch (err) {
            console.log(err)
            records = []
        }
    
        res.json(newRecords)
}

async function getCategoryChart(req, res) {
    
}

module.exports = {getMonthChart, getCategoryChart}