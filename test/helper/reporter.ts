import allure from "@wdio/allure-reporter"
import logger from "./logger.js"

/**
 * Global reporter used for both logger and Allure.
 * Currently added message goes as a arg to .addStep() of allure, add more param as required
 * Allure can ignore certain steps such as retry steps
 * @param testId : this.testId or NA. This is a mandatory field
 * @param logLevel
 * @param toAllure default true
 * @param msh
 * @todo
 * 1. Add more param of allure reporter like add issue (to add a JIRA issue)
 */

function addStep(testId: string, logLevel: string, msg: string, toAllure = true, issuedId = undefined) {
    let arr = ["info", "debug", "warn", "error"]
    if (!testId) throw Error(`Invalid testId: ${testId}`)
    if (!msg) logger.error(`Given message: ${msg} is not valid to report`)
    if (!arr.includes(logLevel)) logger.error(`Given logLevel: ${logLevel} is invalid and should be one of these values: ${arr}`)
    try {
        if (logLevel === "info") logger.info(`[${testId}]: ${msg}`)
        if (logLevel === "debug") logger.debug(`[${testId}]: ${msg}`)
        if (logLevel === "warn") logger.warn(`[${testId}]: ${msg}`)
        if (logLevel === "error") {
            logger.error(`[${testId}]: ${msg}`)
            //@ts-ignore
            allure.addStep(msg, {}, "failed") //Substep to fail if error
        } else {
            if (toAllure) allure.addStep(msg)
        }
        if (issuedId) allure.addIssue(issuedId)
    } catch (error) {
        throw Error(`Error reporting reporter step, ${error}`)
    }
}
export default { addStep }