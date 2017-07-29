import Table, {Record} from "./Table"
import Column from "../column/Column"
import ColumnTypes from "../../../define/db/ColumnTypes"

/**
 * 地域テーブル
 * @param  {[type]} "id"               [description]
 * @param  {[type]} ColumnTypes.serial [description]
 * @param  {[type]} false              [description]
 * @param  {[type]} null               [description]
 * @param  {[type]} true               [description]
 * @return {[type]}                    [description]
 */
export default class RegionalTable extends Table {
    public static tableName: string = "regional_entry"
    public static columns: Column[] = [
        new Column("id", ColumnTypes.serial, false, null, true),
        new Column("name", ColumnTypes.text, true),
        new Column("sub_regional", ColumnTypes.textArray, false)
    ]
}

export class RegionalRecord extends Record {}

RegionalTable.RecordClass = RegionalRecord
RegionalRecord.TableClass = RegionalTable
