const express = require('express')
const router = express.Router()
const controller = require('./../controllers')
const addMockData = require('./../controllers/mock/addMockData')

router.post('/get/records', controller.getRecords)
router.get('/get/categories', controller.getCategories)

router.post('/get/chart/bymonth', controller.getMonthChart)
router.get('/get/chart/bycategory', controller.getCategoryChart)

router.post('/add/record', controller.addRecord)
// router.get('/addMockData', addMockData)



module.exports = router
  