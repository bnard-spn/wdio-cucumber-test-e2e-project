import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
// import logger from "../../helper/logger.js"
// import allure from "@wdio/allure-reporter"
import reporter from "../../helper/reporter.js"
import sauceHomePage from "../../page-objects/sauce.home.page.js";

Given(/^As (a|an) (.*) user I login to inventory app$/, async function (prefixText, userType, dataTable) {
    // logger.info(`${this.testId}: Started to login to saucedemo app`)
    // allure.addStep(`${this.testId}: Started to login to saucedemo app`)
    reporter.addStep(this.testId, "info", "Started to login to saucedemo app")
    //Get the test testid
    //console.log(`>> Given Step: Test ID: ${this.testId}`);
    //Getting values from data table
    //let dt = dataTable.hashes()
    //console.log(`>> The type of dt: ${typeof dt}`); // object
    //console.log(`>> The type of dt: ${dt.constructor}`); // array
    //console.log(`>> The value of dt: ${JSON.stringify(dt)}`);
    // Launch Browser
    // @ts-ignore
    await sauceHomePage.navigateTo(browser.options.sauseDemoURL)
    //console.log(`>>Test config values: ${JSON.stringify(browser.options)}`)

    //Login
    //Sample try-catch
    // try {
    //     await $(`#user-nam`).setValue(process.env.TEST_STD_USERNAME)
    //     await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
    //     await $(`#login-button`).click()
    // } catch (err) {
    //     console.log(`Error in first login. Retrying...`)

    //     await browser.refresh()
    //     await browser.pause(2000)
    //     await $(`#user-name`).setValue("standard_user")
    //     await $(`#password`).setValue("secret_sauce")
    //     await $(`#login-button`).click()
    // }
    await sauceHomePage.loginToSauceApp(this.testId, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD)
    // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME)
    // await $(`#password`).setValue(process.env.TEST_STD_PASSWORD)
    // await $(`#login-button`).click()

    // //Login with another user
    // await browser.pause(2000)
    // await browser.reloadSession()

    // await browser.url("https://www.saucedemo.com")
    // await $(`#user-name`).setValue("problem_user")
    // await $(`#password`).setValue("secret_sauce")
    // await $(`#login-button`).click()

    //Back and forward the page
    // await browser.back()
    // await browser.forward()

    // logger.info(`${this.testId}: Successful login`)
    // allure.addStep(`${this.testId}: Successful login`)
    reporter.addStep(this.testId, "info", "Successful login")
});