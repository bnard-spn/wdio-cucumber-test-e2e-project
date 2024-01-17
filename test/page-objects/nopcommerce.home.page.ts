import Page from "./page.js"
import chai from "chai"
import reporter from "../helper/reporter.js"

class HomePage extends Page {
    constructor() {
        super()
    }
    //Page objects
    get usernameField() { return $(`#Email`) }
    get passwordField() { return $(`#Password`) }
    get loginBtn() { return $(`button=Log in`) }

    //Page Actions
    async loginToNopCommerceWeb(testId: string, url: string, username: string, password: string) {
        if (!url || !username || !password) {
            throw Error(`Given data url: ${url}, username: ${username} or password is not valid`)
        }
        url = url.trim()
        try {
            reporter.addStep(testId, "info", `Login to: ${url} with ${username}`)
            await this.navigateTo(url)
            await this.typeInto(await this.usernameField, username)
            await this.typeInto(await this.passwordField, password)
            await this.click(await this.loginBtn)
            reporter.addStep(testId, "info", `Login to: ${url} with ${username} is successful`)
        } catch (err) {
            err.message = `Failed login to nopcommerce web: ${url}, with username: ${username}, ${err.message}`
            throw err
        }
    }
}
export default new HomePage()