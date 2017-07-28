import DBPoolManager from "../../manager/DBPoolManager"
import createInitTags from "./createInitTags"

export default function createInitData() {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        return createInitTags(dbpm)
    })
}
