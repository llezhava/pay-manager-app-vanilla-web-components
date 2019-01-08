const models = require('../../models')
const getFilters = require('../filters')
const _ = require('lodash')

let shape = {
    max: 0,
    dataset: []
}

let mockFilters = {
    fromAmount: 0,
    toAmount: 9555
}

function groupByMonths(data) {
    console.log(data)
}

function getCategoryData(filters) {
    const options = {
        raw: true,
        attributes: ['amount', 'category.name'],
        where: getFilters(filters),
        order: [
            ['category.name', 'DESC']
        ],
        include: [{
            model: models.Category
        }]
    }

    try {
        let data = await models.findAll(options)
        let grouped = grouByCategories(data)
        return grouped
    } catch (err) {
        console.log('Got error!', err)
        return {
            max: 0,
            dataset: []
        }
    }
}

module.exports = getCategoryData