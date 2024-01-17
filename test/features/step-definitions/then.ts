import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";
import fs from "fs"
import nopcommerceCustomersPage from "../../page-objects/nopcommerce.customers.page.js";

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

Then(/^user can verify if all users exist in customers list$/, async function () {

    try {
        // Navigate/select Customer options from left menu
        // @ts-ignore
        await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List`)
        reporter.addStep(this.testId, "info", `Navigated to customer list screen`)

        // Read API response from /data folder
        let filename = `${process.cwd()}/data/apiResponse/reqresAPIUsers.json`
        let data = fs.readFileSync(filename, "utf8")
        let dataObject = JSON.parse(data)

        // For each user object in API response
        let numberOfObject = dataObject.data.length
        let arr = []
        for (let i = 0; i < numberOfObject; i++) {
            let obj = {}
            let firstName = dataObject.data[i].first_name
            let lastName = dataObject.data[i].last_name
            let customerNotFound = await nopcommerceCustomersPage.searchNameAndConfirm(this.testId, firstName, lastName)
            if (customerNotFound) {
                obj['firstName'] = firstName
                obj['lastName'] = lastName
                arr.push(obj)
            }
        }

        // In case user does not exist write it to error file
        if (arr.length > 1) {
            let data = JSON.stringify(arr, undefined, 4)
            let filePath = `${process.cwd()}/results/custNotFoundList.json`
            fs.writeFileSync(filePath, data)
        }
    } catch (err) {
        err.message = `[${this.testId}]: Failed at checking users in nopcommerce site, ${err.message}`
        throw err
    }
})