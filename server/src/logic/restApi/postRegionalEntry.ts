import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalEntryTable, {RegionalEntryRecord} from "../../model/db/table/RegionalEntryTable"

export function registPostRegionalEntry(server) {
    // postメソッドに応答
    server.post("/api/postRegionalEntry" ,(request, response, next) => {
        const name: string = escape(request.body.name)
        const tag_ids: number[] = escape(request.body.tag_ids)
        const text: string = escape(request.body.text)
        const images: string[] = escape(request.body.images)

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            return postRegionalEntry(dbpm, name, tag_ids, images, text)
        }).then(() => {
            response.send(JSON.stringify({
                response: "ok"
            }))
        }).catch((e: Error) => {
            // エラー発生
            response.status(500)
            response.send(JSON.stringify({
                response: "ng",
                error: e
            }))
        })
    })
}

/**
 * postRegionalEntry
 * Entryを投稿
 * @param  {DBPoolManager}                dbpm       [description]
 * @param  {string}                       name       [description]
 * @param  {number[]}                     tag_ids    [description]
 * @param  {string[]}                     image_urls [description]
 * @param  {string}                       text       [description]
 * @return {Promise<RegionalEntryRecord>}            [description]
 */
export default function postRegionalEntry(dbpm: DBPoolManager, name: string,
        tag_ids: number[], images: string[], text: string): Promise<RegionalEntryRecord> {
    const regionalEntryTable = new RegionalEntryTable(dbpm)
    const regionalEntryRecord = new RegionalEntryRecord()
    regionalEntryRecord.setValues({
        name: name,
        tag_ids: tag_ids,
        images: images,
        text: text
    })

    return regionalEntryTable.insert(regionalEntryRecord)
}
