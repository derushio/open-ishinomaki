import DBPoolManager from "../../manager/DBPoolManager"
import RegionalEntryTagTable, {RegionalEntryTagRecord, createTag} from "../../model/db/table/RegionalEntryTagTable"

/**
 * 初期タグを登録
 * @param  {DBPoolManager} dbpm [description]
 * @return {Promise<any>}       [description]
 */
export default function createInitTags(dbpm: DBPoolManager): Promise<any> {
    return Promise.all([
        createTag(dbpm, "イベント"),
        createTag(dbpm, "飲食店"),
        createTag(dbpm, "セール")
    ])
}
