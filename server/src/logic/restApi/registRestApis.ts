import {registGetAllTags} from "./getAllTags"

/**
 * rest api を登録
 * @param {[type]} server [description]
 */
export default function registRestApis(server): void {
    registGetAllTags(server)
}
