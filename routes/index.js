const express = require('express')
const router = express.Router()
const controller = require('./../controllers')
const addMockData = require('./../controllers/addMockData')

// router.use(`/get/records`, (req, res) => {
//     console.log('GETTING RECORDS!')
// })

router.post('/get/records', controller.records)
router.post('/add/record', controller.addRecord)
router.get('/get/categories', controller.categories)
// router.get('/addMockData', addMockData)



module.exports = router
  