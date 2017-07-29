export declare function require(name: string): any
const riot = require("riot")

const commonHeader = require("../../tag/section/common-header.tag")

const regionalSearch = require("../../tag/part/regional-search.tag")
const tagSearch = require("../../tag/part/tag-search.tag")
const sideBar = require("../../tag/section/side-bar.tag")

const search = require("../../tag/part/search.tag")
const searchResults = require("../../tag/section/search-results.tag")
const entryItem = require("../../tag/part/entry-item.tag")

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
