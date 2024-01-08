import { Then } from "@wdio/cucumber-framework";
import chai from "chai";

Then(/^Inventory page should list (.*)$/, async function (numberOfProducts) {
    if (!numberOfProducts) throw Error(`Invalid number provided: ${numberOfProducts}`)
    let items = await $$(`.inventory_item`)
    chai.expect(items.length).to.equal(parseInt(numberOfProducts))
})

Then(/^Validate all products have valid price$/, async function () {
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