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


function getOptions(filters) {
    console.log('Getting Options')
    console.log(filters.fromDate)
    console.log(new Date(filters.fromDate))
    console.log(format(filters.fromDate, ['YYYY-MM-DD hh:mm:ss']))
    let fromAmount = isValid(filters.fromAmount) ? {
            amount: {
                [Op.gte]: [Number(filters.fromAmount)]
            }
        } :
        undefined
    let toAmount = isValid(filters.toAmount) ? {
            amount: {
                $lte: [Number(filters.toAmount)]
            }
        } :
        undefined
    let fromDate = isValid(filters.fromDate) ? {
            date: {
                $gte: [format(filters.fromDate, ['YYYY-MM-DD hh:mm:ss'])]
            }
        } :
        undefined
    let toDate = isValid(filters.toDate) ? {
            date: {
                [Op.lte]: [format(filters.fromDate, ['YYYY-MM-DD hh:mm:ss'])]
            }
        } :
        undefined

    let andFilters = [fromAmount, toAmount, fromDate, toDate].filter(i => i !== undefined)

    console.log(`between andFilters`, andFilters)

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

module.exports = {
    categories,
    records,
    addRecord
}