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

function sumValues(i) {
    return i.reduce((acc, curr) => {
        acc.value += curr.value
        return acc
    }, {
        month: i[0].month,
        value: 0
    })

}

function mapToMonths(data) {
    let months = [{
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

    data.forEach(item => {
        let index = item.month

        months[index].value = item.value
    })

    return months

}

function groupByMonths(data, shape) {
    let byMonth = data.map(i => {
        return {
            value: i.amount,
            month: getMonth(i.date)
        }
    })
    let grouped = _.groupBy(byMonth, 'month')

    let monthValuesSum = _.map(grouped, sumValues)

    let max = _.maxBy(byMonth, 'value').value

    let dataset = mapToMonths(monthValuesSum)

    return {max, dataset}
}

async function getMonthData(filters) {
    const options = {
        raw: true,
        attributes: ['amount', 'date'],
        where: getFilters(filters),
        order: [
            ['date', 'DESC']
        ]
    }

    try {
        let data = await models.Record.findAll(options)
        let grouped = groupByMonths(data, shape)
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