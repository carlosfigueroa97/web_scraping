'use strict'

module.exports = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || `http://localhost:${this.port}`,
    SB_API_KEY: process.env.SCRAPINGBEE_API_KEY || '',
    SB_BASE_URL: `https://app.scrapingbee.com/api/v1?api_key=${this.SB_API_KEY}`
}