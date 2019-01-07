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

    res.json(categories)
}

function getOptions(filters) {
    console.log(filters)
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

    let categories = getCategories(filters.categories)

    let any = getAny(filters.any)


    let andFilters = [fromAmount, toAmount, fromDate, toDate, categories, any].filter(i => i !== undefined)

    return andFilters
}

// TODO:
// 1) Title
// 2) Amount
// 3) Comment
// 4) Tag?
function getAny(any) {
    if (isValid(any)) {
        return {
            $or: [
                isValid(Number(any)) ? {amount: any} : undefined,
                {title: {$like: `%${any}%`}},
                {comment: {$like: `%${any}%`}}
            ].filter(i => i !== undefined)
        }
    } else {
        return undefined
    }
}

function getCategories(list) {
    if (Array.isArray(list) && list.length > 0) {
        return {
            categoryId: {
                $or: list
            }
        }
    } else {
        return undefined
    }
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