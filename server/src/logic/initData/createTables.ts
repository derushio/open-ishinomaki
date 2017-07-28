import DBPoolManager from "../../manager/DBPoolManager"
import RegionalEntryTable from "../../model/db/table/RegionalEntryTable"
import RegionalEntryTagTable from "../../model/db/table/RegionalEntryTagTable"

/**
 * 初期起動時にテーブルを作る
 * @return {Promise<boolean[]>} [description]
 */
export default function createTables(): Promise<boolean[]> {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        return Promise.all([
            new RegionalEntryTable(dbpm).create(),
            new RegionalEntryTagTable(dbpm).create()
        ])
    })
}
