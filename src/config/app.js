'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const __root = path.resolve()

// Configuration
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(expressLayouts)
app.use('/static', express.static(__root + '/src/public'))
app.set('view engine', 'ejs')
app.set('views', __root + '/src/views')
app.set('layout', 'layouts/layout')

module.exports = app