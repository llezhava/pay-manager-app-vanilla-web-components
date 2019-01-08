const models = require('../../models')
const getRecordsData = require('./getRecords')

async function getCategories(req, res) {
    let categories = await models.Category.findAll({
        attributes: ['id', 'name'],
        raw: true
    })

    res.json(categories)
}

async function getRecords(req, res) {
    let filters = req.body

    let data = await getRecordsData(filters)

    res.json(data)
}

async function addRecord(req, res) {
    let item = req.body
    console.log('Item: ', item)
    try {
        await models.Record.create({
            title: item.title,
            amount: item.amount,
            categoryId: item.category,
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