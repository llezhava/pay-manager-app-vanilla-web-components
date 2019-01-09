const {
    getCategories,
    getRecords,
    addRecord
} = require('./records')
const {
    getMonthChart,
    getCategoryChart
} = require('./charts')

const {addMockCategories, addMockRecords} = require('./mock/addMockData')

module.exports = {
    getCategories,
    getRecords,
    addRecord,
    getMonthChart,
    getCategoryChart,
    addMockCategories,
    addMockRecords
}