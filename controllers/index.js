const models = require('../models')


async function categories(req, res) {
    let categories = await models.Category.findAll({attributes: ['id', 'name'], raw: true})
    console.log(categories)
    res.json(categories)
}



async function records(req, res) {
    let filters = req.body
    const options = {
        raw: true,
        attributes: ['title', 'amount', 'date', 'comment'],
        include: [
            {model: models.Category}
        ]
    }
    let records = await models.Record.findAll(options)

    let newRecords = records.map(record => {
        let {title, amount, date, comment} = record
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

module.exports = {
    categories, records
}