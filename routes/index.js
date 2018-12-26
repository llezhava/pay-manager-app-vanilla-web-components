const express = require('express')
const router = express.Router()
const api = require('./../services/api')

router.post('/payments', api.payments)
router.get('/categories', api.categories)


module.exports = router
  