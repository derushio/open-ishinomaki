export declare function require(name: string): any
const $  = require("jquery")
const riot = require("riot")

const googleMap = require("../../tag/part/google-map")
const entry = require("../../tag/section/entry")

import {pajax} from "../../util/PromisedAjax"

function getParam() {
    let args = {}
    let pair = location.search.substring(1).split('&')
    for(let i = 0; pair[i]; i++) {
        var kv = pair[i].split('=')
        args[kv[0]] = kv[1]
    }
    return args
}

;(<any>window).args = getParam()

riot.mount("*")
