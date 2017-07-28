import DBPoolManager from "../../manager/DBPoolManager"
import RegionalEntryTagTable, {RegionalEntryTagRecord} from "../../model/db/table/RegionalEntryTagTable"

export function registGetAllTags(server) {
    // getメソッドに応答
    server.get("/api/getAllTags" ,(request, response, next) => {
        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            return getAllTags(dbpm)
        }).then((tags: RegionalEntryTagRecord[]) => {
            response.send(JSON.stringify({
                tags: tags.map((tag: RegionalEntryTagRecord) => {
                    return tag.toObject()
                })
            }))
        }).catch((e: Error) => {
            // エラー発生
            response.status(500)
            response.send(JSON.stringify({
                error: e
            }))
        })
    })
}

/**
 * 全てのタグを取得
 * @param  {[type]}                            dbpm [description]
 * @return {Promise<RegionalEntryTagRecord[]>}      [description]
 */
export default function getAllTags(dbpm): Promise<RegionalEntryTagRecord[]> {
    const regionalEntryTagTable = new RegionalEntryTagTable(dbpm)
    return regionalEntryTagTable.search("0=0")
}
