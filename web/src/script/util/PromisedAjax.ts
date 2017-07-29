export declare function require(name: string): any
const $ = require("jquery")

import { AjaxFailError } from "../define/Error"

export function pajax(type: string, url: string, headers: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        let sendHeaders = headers || {}
        sendHeaders["Content-type"] = "Application/json"

        $.ajax({
            type: type,
            url: url,
            headers: sendHeaders,
            data: JSON.stringify(data)
        }).done((response) => {
            resolve(JSON.parse(response))
        }).fail((jqXHR, textStatus, MessageThrown) => {
            reject(new AjaxFailError(jqXHR))
        })
    })
}
