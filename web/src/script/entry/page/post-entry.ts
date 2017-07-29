export declare function require(name: string): any
const $  = require("jquery")
const riot = require("riot")

const commonHeader = require("../../tag/section/common-header.tag")

const inputFormItem = require("../../tag/part/input-form-item.tag")
const inputFormPulldown = require("../../tag/part/input-form-pulldown.tag")
const postEntry = require("../../tag/section/post-entry.tag")

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
