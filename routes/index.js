const express = require('express')
const router = express.Router()
const controller = require('./../controllers')
const addMockData = require('./../models/addMockData')

router.post('/payments', controller.payments)
router.get('/categories', controller.categories)
// router.get('/addMockData', addMockData)



module.exports = router
  