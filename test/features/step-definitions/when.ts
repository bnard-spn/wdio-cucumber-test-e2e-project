import { When } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.js";
import nopcommerceHomePage from "../../page-objects/nopcommerce.home.page.js";

When(/^an (.*) user login to nopcommerce site$/, async function (user) {
    if (!user) throw Error(`Given user: ${user} is not valid`)
    user = user.trim().toUpperCase()
    try {
        reporter.addStep(this.testId, "info", "Login to nopcommerce demo site")
        await nopcommerceHomePage.loginToNopCommerceWeb(
            this.testId,
            //@ts-ignore
            browser.options.nopCommerceBaseURL,
            process.env[`TEST_NOP_${user}_USERNAME`],
            process.env[`TEST_NOP_${user}_PASSWORD`]
        )
    } catch (error) {
        error.message = `[${this.testId}]: Failed at nopcommerce login step, ${error.message}`
        throw error
    }
})