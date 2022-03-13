const respConst = require("../commons/Const/Response");

const route = require("express").Router();

route.get("/v1/simple", (req, res) => {
    const puppeteer = require('puppeteer')

    async function scrape() {
        const browser = await puppeteer.launch({})
        const page = await browser.newPage()
     
        await page.goto('https://www.thesaurus.com/browse/smart')
        for(i = 1; i < 6; i++){
            var element = await page.waitFor("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a")
            var text = await page.evaluate(element => element.textContent, element)
            console.log(text)
        }
        browser.close()
     }
     scrape()

    res.status(200).json({
        result: respConst.SUCCESS,
        isValid: true,
        isTest: true
    })
})

module.exports = route;