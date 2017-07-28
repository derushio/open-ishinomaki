import Table, {Record} from "./Table"
import Column from "../column/Column"
import ColumnTypes from "../../../define/db/ColumnTypes"

export default class TestTable extends Table {
    public static tableName: string = "test"
    public static columns: Column[] = [
        new Column("id", ColumnTypes.serial, false, null, true),
        new Column("name", ColumnTypes.text, true),
        new Column("value", ColumnTypes.text, true)
    ]
}

export class TestRecord extends Record {}

TestTable.RecordClass = TestRecord
TestRecord.TableClass = TestTable
