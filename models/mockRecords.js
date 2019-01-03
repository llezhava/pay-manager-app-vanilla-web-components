const fs = require('fs');
const path = require('path')
const mockDataPath = path.join(__dirname, 'records.json')

let mockRecords = fs.readFileSync(mockDataPath, 'utf8')

module.exports = JSON.parse(mockRecords)