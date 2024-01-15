import Page from "./page.js"
import chai from "chai"
import reporter from "../helper/reporter.js"

class HomePage extends Page {
    constructor() {
        super()
    }

    /**Page objects */
    get usernameInputField() { return $(`#user-name`) }
    get passwordInputField() { return $(`#password`) }
    get loginButton() { return $(`#login-button`) }

    /**Page actions */
    async enterUsername(testId: string, username: string) {
        if (!username) throw Error(`Given username: ${username} is not valid`)
        try {
            username = username.trim()
            await this.typeInto(await this.usernameInputField, username)
            reporter.addStep(testId, "info", `Username value: ${username} entered successfully`)
        } catch (err) {
            err.message = `Error entering username: ${username}, ${err.message}`
            throw err
        }
    }

    async enterPassword(testId: string, password: string) {
        if (!password) throw Error(`Given password is not valid`)
        try {
            password = password.trim()
            await this.typeInto(await this.passwordInputField, password)
            reporter.addStep(testId, "info", `Password value entered successfully`)
        } catch (err) {
            err.message = `Error entering password, ${err.message}`
            throw err
        }
    }

    async clickLoginButton(testId: string) {
        try {
            await this.click(await this.loginButton)
            reporter.addStep(testId, "info", `Login button clicked successfully`)
        } catch (err) {
            err.message = `Error clicking login button, ${err.message}`
            throw err
        }
    }

    async loginToSauceApp(testId: string, username: string, password: string) {
        try {
            await this.enterUsername(testId, username)
            await this.enterPassword(testId, password)
            await this.clickLoginButton(testId)
        } catch (err) {
            throw err
        }
    }
}
export default new HomePage()