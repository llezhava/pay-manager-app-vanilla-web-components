const models = require('../../models')
const getFilters = require('../filters')
const _ = require('lodash')

function sumValues(i) {
    return i.reduce((acc, curr) => {
        acc.value += curr.value
        return acc
    }, {
        name: i[0].name,
        value: 0
    })
}

function groupByCategory(data) {
    let grouped = _.groupBy(data, 'name')
    let dataset = _.map(grouped, sumValues)

    let max = _.maxBy(dataset, 'value').value

    return {max, dataset}
}

async function getCategoryData(filters) {
    const options = {
        raw: true,
        attributes: [['amount', 'value'], 'category.name'],
        where: getFilters(filters),
        order: [
            ['categoryId', 'DESC']
        ],
        include: [{
            model: models.Category
        }]
    }

    try {
        let data = await models.Record.findAll(options)
        let grouped = groupByCategory(data)
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