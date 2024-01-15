import chai from "chai";

export default class Page {
    constructor() {

    }

    /**All reusable web functions */
    async navigateTo(path: string) {
        await browser.url(path)
        await browser.maximizeWindow()
    }

    async click(element: WebdriverIO.Element) {
        await element.waitForClickable({ timeout: 5000 })
        if (!element.elementId) {
            throw Error(element.error.message)
        }
        await element.click()
    }

    async typeInto(element: WebdriverIO.Element, text: string) {
        await element.waitForDisplayed({ timeout: 5000 })
        if (!element.elementId) {
            throw Error(element.error.message)
        }
        await element.setValue(text)
    }
}