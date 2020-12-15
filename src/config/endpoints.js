'use strict'

const app = require('./app')

// Endpoints
app.use(require('../routes/index'))
app.use(require('../routes/scraping_fg'))

module.exports = app