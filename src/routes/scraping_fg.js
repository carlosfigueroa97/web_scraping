'use strict'

const router = require('express').Router()
const ctrl = require('../controllers/scraping_fg')

router.get('/get.data', ctrl.getData)

module.exports = router