import DBPoolManager from "../manager/DBPoolManager"
import RegionalEntryTagTable, {RegionalEntryTagRecord, createTag} from "../model/db/table/RegionalEntryTagTable"

export default function createInitData() {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        // TODO: 重複チェック
        return Promise.all([
            createTag(dbpm, "イベント"),
            createTag(dbpm, "飲食店")
        ])
    })
}
