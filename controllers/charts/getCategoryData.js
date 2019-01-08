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
    let fn = _.flow([
        data => _.groupBy(data, 'name'),
        grouped => _.map(grouped, sumValues),
        dataset => {
            return {
                max: _.maxBy(dataset, 'value').value,
                dataset
            }
        }
    ])

    return fn(data)
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