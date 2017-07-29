import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalEntryTable, {RegionalEntryRecord} from "../../model/db/table/RegionalEntryTable"
import RegionalEntryTagTable, {RegionalEntryTagRecord} from "../../model/db/table/RegionalEntryTagTable"

export function registGetRegionalEntries(server) {
    // getメソッドに応答
    server.get("/api/getRegionalEntries" ,(request, response, next) => {
        // あいまい検索用キーワード
        const q: string = escape(request.body.q)

        const tag_ids: number[] = escape(request.body.tag_ids)
        const tag_and_search: boolean = escape(request.body.tag_and_search)

        const regional_id_maps: RegionalIdMapForGet[] = escape(request.body.regional_id_maps)

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            return getRegionalEntries(dbpm, q, tag_ids, tag_and_search,regional_id_maps)
        }).then((entries: RegionalEntryRecord[]) => {
            response.send(JSON.stringify({
                response: "ok",
                entries: entries.map((entry) => {
                    return entry.toObject()
                })
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

export default function getRegionalEntries(dbpm: DBPoolManager,q: string,
        tag_ids: number[], tag_and_search: boolean,
        regional_id_maps: RegionalIdMapForGet[]): Promise<RegionalEntryRecord[]> {
    const regionalEntryTable = new RegionalEntryTable(dbpm)

    let query = ""
    if (q) {
        query += "name LIKE '%" + q + "%' and"
    }
    if (tag_ids) {
        query += tag_ids.map((tag_id) => {
            return "ANY(tag_ids)='" + "tag_id" + "'" + (tag_and_search)? " and" : " or"
        })
    }
    if (regional_id_maps) {
        query += regional_id_maps.map((regional_id_map: RegionalIdMapForGet) => {
            let query_id = "regional_id=" + regional_id_map.regionalId
            if (regional_id_map.subRegionalId) {
                query_id += "and sub_regional_id=" + regional_id_map.subRegionalId
            }
            return query_id
        })
    }
    query.replace(/(and$)|(or$)/, ";")
    if (query == "") {
        query = "0=0"
    }

    return regionalEntryTable.search(query)
}

interface RegionalIdMapForGet {
    regionalId: number
    subRegionalId: number
}
