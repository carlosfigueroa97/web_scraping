'use strict'

if(process.env.NODE_ENV !== 'production')
    require('dotenv').config()

const app = require('./src/config/app')
const config = require('./src/config/config')

// Initialize endpoints
require('./src/config/endpoints')

app.listen(config.PORT, (err) => {
    if(err)
        return console.log(`Error to connect: ${err}`)

    console.log(`Server running on PORT: ${config.PORT}`)
})