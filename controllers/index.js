const models = require('../models')
const Sequelize = require('sequelize');
const {
    format
} = require('date-fns')
const Op = Sequelize.Op


function isValid(val) {
    return val !== null && val !== undefined && val !== ""
}

async function categories(req, res) {
    let categories = await models.Category.findAll({
        attributes: ['id', 'name'],
        raw: true
    })
    console.log(categories)
    res.json(categories)
}

function fromDateFilter(date) {

}

function getOptions(filters) {
    let fromAmount = isValid(filters.fromAmount) ? {
            amount: {
                $gte: Number(filters.fromAmount)
            }
        } :
        undefined
    let toAmount = isValid(filters.toAmount) ? {
            amount: {
                $lte: Number(filters.toAmount)
            }
        } :
        undefined
    let fromDate = isValid(filters.fromDate) ? {
            date: {
                $gte: format(filters.fromDate, ['YYYY-MM-DD'])
            }
        } :
        undefined

    let toDate = isValid(filters.toDate) ? {
            date: {
                $lte: format(filters.toDate, ['YYYY-MM-DD'])
            }
        } :
        undefined

    let andFilters = [fromAmount, toAmount, fromDate, toDate].filter(i => i !== undefined)

    return andFilters
}

async function records(req, res) {
    let filters = req.body
    const options = {
        raw: true,
        attributes: ['title', 'amount', 'date', 'comment'],
        where: {
            [Op.and]: getOptions(filters)
        },
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

    let newRecords = records.map(record => {
        let {
            title,
            amount,
            date,
            comment
        } = record
        return {
            title,
            amount,
            date,
            comment,
            category: record['category.name']
        }
    })

    res.json(newRecords)
}

async function addRecord(req, res) {
    let item = req.body
    console.log('Item: ', item)

    res.json({
        success: true
    })
}

async function getFromDate(req, res) {
    let date = ''
    let options = {
        raw: true,
        attributes: ['date'],
        where: {
                date: {$gte: date}
        }

    }

    let records = await models.find(options)
}

module.exports = {
    categories,
    records,
    addRecord
}