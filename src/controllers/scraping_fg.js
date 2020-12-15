const fetch = require('node-fetch')
const cheerio = require('cheerio')
const urls = require('../helpers/urls')
const resource = require('../helpers/strings')

async function getData(req, res){
    try {
        var search_term = req.query.search_term
        var page_size = req.query.page_size

        if(!search_term || !page_size)
            return res.status(500).send({
                message: resource.errors.err_500,
                error: resource.errors.err_params
            })

        var url = `${urls.base_url_fg}SearchDisplay?categoryId=&storeId=10151&catalogId=10052&langId=-24&sType=SimpleSearch&resultCatEntryType=2&showResultsPage=true&searchSource=Q&pageView=&beginIndex=0&pageSize=${page_size}&searchTerm=${search_term}`

        var response = await fetchUrl(url)

        if(!response.res)
            return res.status(response.status).send({
                error: resource.errors.err_unknown
            })

        var data = extractData(response.res)

        if(data.status === 500)
            return res.status(500).send({
                message: resource.errors.err_500,
                error: data.error
            })

        res.status(200).send({
            'data': data
        })
    } catch (err) {
        res.status(500).send({
            message: resource.errors.err_500,
            error: err.message
        })
    }
}

async function fetchUrl(url){
    try {
        var html = await fetch(url, {
            method: 'GET'
        })
    
        if(html.status === 200){
            var text = await html.text()
            return {
                res: text
            }
        }
    
        return {
            res: false,
            status: html.status
        }   
    } catch (err) {
        return {
            res: false,
            status: 500
        }
    }
}

function extractData(data){
    try {
        var r_title = 'div[class=product_info] > div[class=product_name] a'
        var r_old_price = 'div[class=product_info] > div[class=product_price] span[class=old_price]'
        var r_price = 'div[class=product_info] > div[class=product_price] span[class=price]'

        var $ = cheerio.load(data)

        var results = $('div[class=product]')

        var deals = results.map((idx, el) => {
            const elementSelector = $(el)
            var title = extractDeal(elementSelector, r_title)
            var price = extractDeal(elementSelector, r_price)
            var old_price = extractDeal(elementSelector, r_old_price)
            var product = {
                'title': title,
                'prices': [{
                    'old_price': old_price,
                    'price': price
                }]
            }
            return product
        }).get()

        return deals   
    } catch (error) {
        return {
            status: 500,
            error: error.message
        }
    }
}

function extractDeal(selector, route){
    const value = selector.find(route).text().trim()
    return value
}

module.exports = {
    getData
}