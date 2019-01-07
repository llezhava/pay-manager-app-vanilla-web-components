const models = require('../../models')
const getFilters = require('../filters')

async function getCategories(req, res) {
    let categories = await models.Category.findAll({
        attributes: ['id', 'name'],
        raw: true
    })

    res.json(categories)
}

async function getRecords(req, res) {
    let filters = req.body
    const options = {
        raw: true,
        attributes: ['title', 'amount', 'date', 'comment'],
        where: getFilters(filters),
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
    try {
        await models.Record.create({
            title: item.title,
            amount: item.amount,
            category: item.category,
            date: item.date,
            comment: item.comment
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log('Error during add, ', err)

        res.json({
            success: false
        })
    }
}

module.exports = {
    getCategories,
    getRecords,
    addRecord
}