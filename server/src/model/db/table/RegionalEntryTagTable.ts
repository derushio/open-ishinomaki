import DBPoolManager from "../../../manager/DBPoolManager"
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
 * @param  {RegionalEntryTagTable} regionalEntryTable [description]
 * @param  {string}                name               [description]
 * @return {[type]}                                   [description]
 */
export function createTag(dbpm: DBPoolManager, name: string) {
    const regionalEntryTagTable = new RegionalEntryTagTable(dbpm)
    const regionalEntryTagRecord = new RegionalEntryTagRecord()
    regionalEntryTagRecord.setValues({
        name: name
    })
    return regionalEntryTagTable.insert(regionalEntryTagRecord)
}
