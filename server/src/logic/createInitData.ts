import DBPoolManager from "../manager/DBPoolManager"
import createInitTags from "./initData/createInitTags"

export default function createInitData() {
    return DBPoolManager.getInstance().then((dbpm: DBPoolManager) => {
        return createInitTags(dbpm)
    })
}
