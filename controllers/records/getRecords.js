const models = require('../../models')
const getFilters = require('../filters')

async function getRecords(filters) {
    const options = {
        raw: true,
        attributes: ['title', 'amount', 'date', 'comment'],
        where: getFilters(filters),
        order: [['date', 'DESC']],
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

    return newRecords
}

module.exports = getRecords