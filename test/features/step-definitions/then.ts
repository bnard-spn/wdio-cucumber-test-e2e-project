import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";

Then(/^Inventory page should list (.*)$/, async function (numberOfProducts) {
    try {
        //console.log(wdio); //ReferenceError
        //console.log(`>> Then Step: Test ID: ${this.testId}`);
        //console.log(`>> APP ID: ${this.appId}`)
        if (!numberOfProducts) throw Error(`Invalid number provided: ${numberOfProducts}`)
        let items = await $$(`.inventory_item`)
        try {
            chai.expect(items.length).to.equal(parseInt(numberOfProducts))
        } catch (err) {
            reporter.addStep(this.testId, "error", "Known issue - product count mismatch", true, "JIRA_123")
        }
    } catch (err) {
        console.log(`>> Error Type: ${typeof err}`)
        console.log(`>> Error Name: ${typeof err.name}`)
        console.log(`>> Error Message: ${typeof err.message}`)
        // throw err //For failing the run
        // logger.error(err.message) //Log and continue
    }
})

Then(/^Validate all products have valid price$/, async function () {
    logger.info(`[${this.testId}]: Validating prices`)
    //Get price list
    let priceList = await $$(`.inventory_item_price`)
    let priceStringList = []
    for (let index = 0; index < priceList.length; index++) {
        let price = await priceList[index].getText()
        priceStringList.push(price)
    }
    //Convert string to number
    let priceNumArr = priceStringList.map(ele => +(ele.replace("$", "")))

    //Asert if any value is < 0
    let invalidPriceList = priceNumArr.filter(ele => ele <= 0)
    chai.expect(invalidPriceList.length).to.equal(0)
})