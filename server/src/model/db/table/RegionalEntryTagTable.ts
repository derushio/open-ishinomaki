import DBPoolManager, {escape} from "../../../manager/DBPoolManager"
import Table, {Record} from "./Table"
import Column from "../column/Column"
import ColumnTypes from "../../../define/db/ColumnTypes"

export default class RegionalEntryTagTable extends Table {
    public static tableName: string = "regional_entry_tag"
    public static columns: Column[] = [
        new Column("id", ColumnTypes.serial, false, null, true),
        new Column("name", ColumnTypes.text, true),
    ]
}

export class RegionalEntryTagRecord extends Record {}

RegionalEntryTagTable.RecordClass = RegionalEntryTagRecord
RegionalEntryTagRecord.TableClass = RegionalEntryTagTable

/**
 * タグを生成する
 * @param  {DBPoolManager}                   dbpm [description]
 * @param  {string}                          name [description]
 * @return {Promise<RegionalEntryTagRecord>}      [description]
 */
export function createTag(dbpm: DBPoolManager, name: string): Promise<RegionalEntryTagRecord> {
    const regionalEntryTagTable = new RegionalEntryTagTable(dbpm)
    return regionalEntryTagTable.search("name=" + escape(name)).then((regionalEntryTags: RegionalEntryTagRecord[]) => {
        if (regionalEntryTags.length == 0) {
            return null
        }

        const regionalEntryTagRecord = new RegionalEntryTagRecord()
        regionalEntryTagRecord.setValues({
            name: name
        })
        return regionalEntryTagTable.insert(regionalEntryTagRecord)
    })
}
