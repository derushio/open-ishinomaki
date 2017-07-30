import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalEntryTable, {RegionalEntryRecord} from "../../model/db/table/RegionalEntryTable"

export function registPostRegionalEntry(server) {
    // postメソッドに応答
    server.post("/api/postRegionalEntry" ,(request, response, next) => {
        const name: string = escape(request.body.name)
        const tag_ids: number[] = escape(request.body.tag_ids)
        const text: string = escape(request.body.text)
        const images: string[] = escape(request.body.images)
        const regional_id: number = escape(request.body.regional_id)
        const sub_regional_id: number = escape(request.body.sub_regional_id)
        const point: string = escape(request.body.latlng)

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            let latlng
            if (point) {
                const pointArray = point.replace(/\(|\)| /g, "").split(",")
                latlng = { x: pointArray[0], y: pointArray[1] }
            }

            return postRegionalEntry(dbpm, name, tag_ids, images, text, regional_id, sub_regional_id, latlng)
        }).then(() => {
            response.send(JSON.stringify({
                response: "ok"
            }))
        }).catch((e: Error) => {
            // エラー発生
            response.status(500)
            response.send(JSON.stringify({
                response: "ng",
                message: e.message,
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
        tag_ids: number[], images: string[], text: string,
        regional_id: number, sub_regional_id: number, latlng: any): Promise<RegionalEntryRecord> {
    const regionalEntryTable = new RegionalEntryTable(dbpm)
    const regionalEntryRecord = new RegionalEntryRecord()
    regionalEntryRecord.setValues({
        name: name,
        tag_ids: tag_ids,
        images: images,
        text: text,
        regional_id: regional_id,
        sub_regional_id: sub_regional_id,
        latlng: latlng
    })

    return regionalEntryTable.insert(regionalEntryRecord)
}
