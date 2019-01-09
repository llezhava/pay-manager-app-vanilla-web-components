const models = require('../../models')
const categories = ['Food', 'Gasoline', 'Entertainment', 'Mobile Services', 'Taxes']
const getRecords = require('./mockRecords')

async function addCategoriesModel(categories, model) {
    let results = []
    categories.forEach(async category => {
        const options = {
            where: {name: category}
        }
        results.push(model.findOrCreate(options))
    })
    return Promise.all(results)
}

async function addRecordsModel(records, model) {
    let results = []
    records.forEach(async record => {
        results.push(model.create(record))
    })

    return Promise.all(results)
}


async function addRecords(req, res) {
    let amount = req.params.amount
    let records = getRecords(amount)
    let recordsModel = models.Record
    try {
        await addRecordsModel(records, recordsModel)
        res.json(records[0])

    } catch(err) {
        res.send('error')
    }
}

async function addCategories(req, res) {
    let categoriesModel = models.Category
    try {
        await addCategoriesModel(categories, categoriesModel)
        res.send('success')
    } catch(err) {
        console.log('error')
        res.send('Error')
    }
}
module.exports = {addMockRecords: addRecords, addMockCategories: addCategories}