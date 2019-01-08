const models = require('../../models')
const getFilters = require('../filters')
const _ = require('lodash')
const {
    getMonth
} = require('date-fns')

let shape = {
    max: 0,
    dataset: [{
            name: 'Jan',
            value: 0
        },
        {
            name: 'Feb',
            value: 0
        },
        {
            name: 'Mar',
            value: 0
        },
        {
            name: 'Apr',
            value: 0
        },
        {
            name: 'May',
            value: 0
        },
        {
            name: 'Jun',
            value: 0
        },
        {
            name: 'Jul',
            value: 0
        },
        {
            name: 'Aug',
            value: 0
        },
        {
            name: 'Sep',
            value: 0
        },
        {
            name: 'Oct',
            value: 0
        },
        {
            name: 'Nov',
            value: 0
        },
        {
            name: 'Dec',
            value: 0
        }
    ]
}

let mockFilters = {
    fromAmount: 0,
    toAmount: 9555
}

function groupByMonths(data) {
    console.log(data)
}

function getMonthData(filters) {
    const options = {
        raw: true,
        attributes: ['amount', 'date'],
        where: getFilters(filters),
        order: [
            ['date', 'DESC']
        ],
        include: [{
            model: models.Category
        }]
    }

    try {
        let data = await models.findAll(options)
        let grouped = groupByMonths(data)
        return grouped
    } catch (err) {
        console.log('Got error!', err)
        return {
            max: 0,
            dataset: []
        }
    }
}

module.exports = getMonthData