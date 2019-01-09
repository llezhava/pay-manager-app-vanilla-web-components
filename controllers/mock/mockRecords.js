const fs = require('fs');
const path = require('path')
const faker = require('faker')
const mockDataPath = path.join(__dirname, 'records.json')

function createFakeRecord() {
    let record = {
        title: faker.lorem.words(),
        amount: faker.random.number({min: 1, max: 1500}) + Math.round(Math.random() * 100) / 100,
        date: faker.date.past(3),
        comment: faker.lorem.sentence(),
        categoryId: faker.random.number({min: 1, max: 5})
    }
    return record
}

function createFakeRecords(amount) {
    let records = []
    for(let i = 0; i <= amount; i++) {
        records.push(createFakeRecord())
    }
    return records
}

module.exports = createFakeRecords