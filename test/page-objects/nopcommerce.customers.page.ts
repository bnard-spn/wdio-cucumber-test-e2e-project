import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";

class CustomerList extends Page {
    constructor() {
        super()
    }

    // Page objects
    get firstNameField() { return $(`#SearchFirstName`) }
    get lastNameField() { return $(`#SearchLastName`) }
    get searchBtn() { return $(`#search-customers`) }
    get noResultsMessage() { return $(`td=No data available in table`) }

    // Page actions
    async searchNameAndConfirm(testId: string, firstName: string, lastName: string): Promise<boolean> {
        if (!firstName || !lastName) throw Error(`Invalid firstName: ${firstName} or lastName: ${lastName} to search`)
        let nameNotExist = false
        firstName = firstName.trim()
        lastName = lastName.trim()
        reporter.addStep(testId, "info", `Search user: ${firstName} ${lastName}`)
        try {
            await this.typeInto(await this.firstNameField, firstName)
            await this.typeInto(await this.lastNameField, lastName)
            await this.click(await this.searchBtn)
            await browser.pause(1000)
            let isNotDisplayed = await this.noResultsMessage.isDisplayed()
            if (isNotDisplayed) nameNotExist = true
        } catch (error) {
            throw `Failed searching givern firstName: ${firstName} and lastName: ${lastName} on customers page, ${error}`
        }
        return nameNotExist
    }
}
export default new CustomerList()