import DBPoolManager, {escape} from "../../manager/DBPoolManager"
import RegionalTable, {RegionalRecord} from "../../model/db/table/RegionalTable"

export function registGetRegional(server) {
    // getメソッドに応答
    server.get("/api/getRegional" ,(request, response, next) => {
        // 検索
        const q: string = escape(request.query.q)

        DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
            return getRegional(dbpm, q)
        }).then((regionals: RegionalRecord[]) => {
            response.send(JSON.stringify({
                response: "ok",
                regionals: regionals.map((regional: RegionalRecord) => {
                    return regional.toObject()
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

export default function getRegional(dbpm: DBPoolManager, q: string): Promise<RegionalRecord[]> {
    const regionalTable = new RegionalTable(dbpm)
    if (q == null) {
        return regionalTable.search("0=0")
    }
    return regionalTable.search("name LIKE '%" + q + "%'")
}
