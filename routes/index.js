const express = require('express')
const router = express.Router()
const controller = require('./../controllers')
const addMockData = require('./../controllers/addMockData')

router.post('/payments', controller.records)
router.get('/categories', controller.categories)
// router.get('/addMockData', addMockData)



module.exports = router
  