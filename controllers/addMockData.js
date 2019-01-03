const models = require('./../models')
const categories = ['Food', 'Gasoline', 'Entertainment', 'Mobile Services', 'Taxes']
const records = require('./mockRecords')

async function addCategories(categories, model) {
    let results = []
    categories.forEach(async category => {
        const options = {
            where: {name: category}
        }
        results.push(model.findOrCreate(options))
    })
    return Promise.all(results)
}

async function addRecords(records, model) {
    let results = []
    records.forEach(async record => {
        results.push(model.create(record))
    })

    return Promise.all(results)
}


async function addMockData(req, res) {
    const categoriesModel = models.Category
    const recordsModel = models.Record
    try {
        await addCategories(categories, categoriesModel)
        await addRecords(records, recordsModel)
        res.send('Added models!')
    } catch(err) {
        console.log('Error adding mock data!', err)
        res.send('Did not add modles!')
    }
    
}

module.exports = addMockData