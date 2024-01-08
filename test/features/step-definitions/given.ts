import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Login to inventory web app$/, async function () {
    // Launch Browser
    await browser.url("https://www.saucedemo.com")

    //Login
    try {
        await $(`#user-nam`).setValue("standard_user")
        await $(`#password`).setValue("secret_sauce")
        await $(`#login-button`).click()
    } catch (err) {
        console.log(`Error in first login. Retrying...`)

        await browser.refresh()
        await browser.pause(2000)
        await $(`#user-name`).setValue("standard_user")
        await $(`#password`).setValue("secret_sauce")
        await $(`#login-button`).click()
    }

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

});