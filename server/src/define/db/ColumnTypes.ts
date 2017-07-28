import ColumnType from "../../model/db/column/ColumnType"
import JsonbModel from "../../model/db/column/psqlmodel/JsonbModel"
import DateModel from "../../model/db/column/psqlmodel/DateModel"

export default class ColumnTypes {
    static serial = new ColumnType("SERIAL", Number)
    static bigserial = new ColumnType("BIGSERIAL", Number)

    static int = new ColumnType("INT", Number)
    static intArray = new ColumnType("INT[]", Array)
    static bigint = new ColumnType("BIGINT", Number)
    static bigintArray = new ColumnType("BIGINT[]", Array)

    static boolean = new ColumnType("BOOLEAN", Boolean)

    static text = new ColumnType("TEXT", String)
    static textArray = new ColumnType("TEXT[]", Array)

    static jsonb = new ColumnType("JSONB", JsonbModel)

    static date = new ColumnType("DATE", DateModel)
}
