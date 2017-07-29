import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalEntryTable, {RegionalEntryRecord} from "../../model/db/table/RegionalEntryTable"
import RegionalEntryTagTable, {RegionalEntryTagRecord} from "../../model/db/table/RegionalEntryTagTable"

export function registGetRegionalEntry(server) {
    // getメソッドに応答
    server.get("/api/getRegionalEntry" ,(request, response, next) => {
        // あいまい検索用キーワード
        const q: string = escape(request.body.q)
        const tag_ids: number[] = escape(request.body.tag_ids)
        const tag_and_search: boolean = escape(request.body.tag_and_search)

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {

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

export default function getRegionalEntry(dbpm: DBPoolManager) {
    
}
