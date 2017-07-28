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
