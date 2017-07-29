import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalEntryTable, {RegionalEntryRecord} from "../../model/db/table/RegionalEntryTable"
import RegionalEntryTagTable, {RegionalEntryTagRecord} from "../../model/db/table/RegionalEntryTagTable"

export function registGetRegionalEntries(server) {
    // getメソッドに応答
    server.get("/api/getRegionalEntries" ,(request, response, next) => {
        // あいまい検索用キーワード
        const id: number = escape(request.query.id)
        const q: string = escape(request.query.q)

        let tag_ids: number[]
        if (request.query.tag_ids) {
            tag_ids = escape(JSON.parse(request.query.tag_ids))
        }

        const tag_and_search: boolean = escape(request.query.tag_and_search)

        let regional_id_maps: RegionalIdMapForGet[]
        if (request.query.regional_id_maps) {
            regional_id_maps = escape(JSON.parse(request.query.regional_id_maps))
        }

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            return getRegionalEntries(dbpm, id, q, tag_ids, tag_and_search,regional_id_maps)
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

export default function getRegionalEntries(dbpm: DBPoolManager,id: number, q: string,
        tag_ids: number[], tag_and_search: boolean,
        regional_id_maps: RegionalIdMapForGet[]): Promise<RegionalEntryRecord[]> {
    const regionalEntryTable = new RegionalEntryTable(dbpm)

    let query = ""
    if (id) {
        query += "id='" + id + "'"
    } else {
        if (q) {
            query += "name LIKE '%" + q + "%' and"
        }
        if (tag_ids) {
            query += tag_ids.reduce((prev: string, tag_id: number) => {
                return prev + "'" + tag_id + "'=ANY(tag_ids)" + ((tag_and_search)? " and " : " or ")
            }, "")
        }
        query = query.replace(/ (and|or) $/, "")
        if (regional_id_maps) {
            query += regional_id_maps.reduce((prev: string, regional_id_map: RegionalIdMapForGet) => {
                let query_id = "regional_id=" + regional_id_map.regional_id
                if (regional_id_map.sub_regional_id) {
                    query_id += " and sub_regional_id=" + regional_id_map.sub_regional_id
                }
                query_id += " or "
                return prev + query_id
            }, "")
        }
        query = query.replace(/ (and|or) $/, ";")
        if (query == "") {
            query = "0=0"
        }
    }

    return regionalEntryTable.search(query)
}

interface RegionalIdMapForGet {
    regional_id: number
    sub_regional_id: number
}
