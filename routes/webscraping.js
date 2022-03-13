const webHandler = require("../features/webscraping/webscraping_handler");
const respConst = require("../commons/Const/Response");

const route = require("express").Router();

route.get(["/v1/simple", "/v1/simple*", "/v1/simple/:number", "/v1/thatsimple(s|ss)/:number"], (req, res) =>  {
    let mynum = 5;
    if (webHandler.isValid(req.params.number)) {
        mynum = req.params.number;
    }

    const puppeteer = require('puppeteer');
    const oResult = [];

    async function scrape() {
        const browser = await puppeteer.launch({})
        const page = await browser.newPage()
     
        await page.goto('https://www.thesaurus.com/browse/smart')
        for(i = 1; i < mynum; i++){
            var element = await page.waitFor("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a")
            var text = await page.evaluate(element => element.textContent, element)
            console.log(text)

            oResult.push(text)
        }
        browser.close()

        res.status(200).json({
            result: respConst.SUCCESS,
            isValid: true,
            isTest: true,
            myResult: oResult
        })
    }
    scrape()

    // res.status(200).json({
    //     result: respConst.SUCCESS,
    //     isValid: true,
    //     isTest: true,
    //     myResult: oResult
    // })
})

module.exports = route;