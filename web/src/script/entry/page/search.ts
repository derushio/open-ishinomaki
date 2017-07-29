export declare function require(name: string): any
const riot = require("riot")

const regionalSearch = require("../../tag/part/regional-search.tag")
const tagSearch = require("../../tag/part/tag-search.tag")
const sideBar = require("../../tag/section/side-bar.tag")

const search = require("../../tag/part/search.tag")
const searchResults = require("../../tag/section/search-results.tag")

riot.mount("*")
