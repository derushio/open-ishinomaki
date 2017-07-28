import DBPoolManager from "../manager/DBPoolManager"
import TestTable from "../model/db/table/TestTable"

export default function createTables(): Promise<boolean[]> {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        return Promise.all([
            new TestTable(dbpm).create()
        ])
    })
}
