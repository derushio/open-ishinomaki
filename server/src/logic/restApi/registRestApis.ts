import {registGetAllTags} from "./getAllTags"
import {registPostRegionalEntry} from "./postRegionalEntry"

/**
 * rest api を登録
 * @param {[type]} server [description]
 */
export default function registRestApis(server): void {
    registGetAllTags(server)
    registPostRegionalEntry(server)
}
