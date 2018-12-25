const express = require('express')
const mockData = require('../services/mockData')
const router = express.Router()

router.get('/testData', mockData.testData)

module.exports = router
  