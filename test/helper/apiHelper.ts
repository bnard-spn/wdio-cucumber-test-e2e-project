import request from "supertest"
import reporter from "./reporter.ts"

async function GET(testId: string, baseUrl: string, endpoint: string, authToken: string, queryParameters: object) {
    if (!baseUrl || !endpoint) {
        throw Error(`Given baseUrl: ${baseUrl}, endpoint: ${endpoint} is not valid`)
    }
    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testId, "info", `Making a GET call to ${endpoint}`)
    try {
        return await request(baseUrl)
            .get(endpoint)
            .query(queryParameters)
            .auth(authToken, { type: 'bearer' })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
    } catch (err) {
        err.message = `Error making a GET call to ${endpoint}, ${err.message}`
        throw err
    }
}

async function POST(testId: string, baseUrl: string, endpoint: string, authToken: string, payload: object) {
    if (!baseUrl || !endpoint) {
        throw Error(`Given baseUrl: ${baseUrl}, endpoint: ${endpoint} is not valid`)
    }
    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testId, "info", `Making a POST call to ${endpoint}`)
    try {
        return await request(baseUrl)
            .post(endpoint)
            .auth(authToken, { type: 'bearer' })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .send(payload)
    } catch (err) {
        err.message = `Error making a POST call to ${endpoint}, ${err.message}`
        throw err
    }
}
export default { GET, POST }