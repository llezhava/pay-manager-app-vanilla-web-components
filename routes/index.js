const express = require('express')
const router = express.Router()
const api = require('./../services/api')
const addMockData = require('./../models/addMockData')

router.post('/payments', api.payments)
router.get('/categories', api.categories)
// router.get('/addMockData', addMockData)



module.exports = router
  