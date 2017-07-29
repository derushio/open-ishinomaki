import DBPoolManager from "../../manager/DBPoolManager"
import createInitRegional from "./createInitRegional"
import createInitTags from "./createInitTags"

export default function createInitData() {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        return createInitRegional(dbpm).then(() => {
            return createInitTags(dbpm)
        })
    })
}
