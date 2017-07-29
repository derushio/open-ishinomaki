import DBPoolManager from "../../manager/DBPoolManager"
import RegionalTable, {RegionalRecord, createRegional} from "../../model/db/table/RegionalTable"

/**
 * 初期地域を登録
 * @param  {DBPoolManager} dbpm [description]
 * @return {Promise<any>}       [description]
 */
export default function createInitTags(dbpm: DBPoolManager): Promise<any> {
    return Promise.all([
        createRegional(dbpm, "山下", [
            "1丁目", "2丁目"
        ]),
        createRegional(dbpm, "西山", [
            "1丁目", "2丁目"
        ]),
        createRegional(dbpm, "田道町", [
            "1丁目", "2丁目"
        ]),
        createRegional(dbpm, "中央", [
            "1丁目", "2丁目"
        ])
    ])
}
