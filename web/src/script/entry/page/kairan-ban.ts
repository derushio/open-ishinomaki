export declare function require(name: string): any
const $  = require("jquery")
const riot = require("riot")

const commonHeader = require("../../tag/section/common-header.tag")
const entryItem = require("../../tag/section/entry-item.tag")
const searchResults = require("../../tag/section/search-results.tag")

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
;(<any>window).args.q = "石巻"

riot.mount("*")
