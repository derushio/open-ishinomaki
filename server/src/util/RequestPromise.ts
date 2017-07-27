export declare function require(name: string): any
const rp = require("request-promise")

export function request(type: string, url: string, headers: any, data: any): Promise<any> {
    let sendHeaders = headers || {}
    sendHeaders["Content-type"] = "Application/json"

    let option = {
        method: type,
        uri: url,
        headers: sendHeaders,
        qs: data,
        json: true
    }

    return rp(option)
}
