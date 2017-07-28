import Table, {Record} from "./Table"
import Column from "../column/Column"
import ColumnTypes from "../../../define/db/ColumnTypes"

export default class RegionalEntryTable extends Table {
    public static tableName: string = "regional_entry"
    public static columns: Column[] = [
        new Column("id", ColumnTypes.serial, false, null, true),
        new Column("name", ColumnTypes.text, true),
        new Column("tag_ids", ColumnTypes.intArray, false),
        new Column("image_urls", ColumnTypes.textArray, false),
        new Column("text", ColumnTypes.text, true)
    ]
}

export class RegionalEntryRecord extends Record {}

RegionalEntryTable.RecordClass = RegionalEntryRecord
RegionalEntryRecord.TableClass = RegionalEntryTable
