import DBPoolManager, {escape} from "../../../manager/DBPoolManager"
import Column from "../column/Column"
import PsqlModel from "../column/psqlmodel/PsqlModel"

import {subconst} from "../../../util/ClassUtil"

import { SqlExecFailError, TableNotFoundError, RecordMismatchError } from "../../../define/Error"

export default class Table {
    protected dbpm: DBPoolManager
    public static tableName: string
    public static columns: Column[]
    // クラスチェック用にRecordクラスを内包しておく
    public static RecordClass: typeof Record

    constructor(dbpm: DBPoolManager) {
        this.dbpm = dbpm
    }

    /**
     * エラーハンドルのためオーバーラップ
     * @param  {string}       psql
     * @param  {any[]}        varray
     * @return {Promise<any>} resolve(result)
     */
    public exec(psql: string, varray?: any[]): Promise<any> {
        return this.dbpm.exec(psql, varray).then((result) => {
            return Promise.resolve(result)
        }).catch((error: SqlExecFailError) => {
            if (error.extra.message.includes("does not exist")) {
                return Promise.reject(new TableNotFoundError(this))
            }
            return Promise.reject(error)
        })
    }

    public create(): Promise<boolean> {
        return this.checkExistence().then((existance: boolean) => {
            if (existance == true) {
                return Promise.resolve(false)
            }

            // columnArrayからcolumnListを作成
            let columnList: string = subconst(this).columns.reduce((prev: string, column: Column, i: Number) => {
                let text = prev + column.getCreateText()
                text += ", "
                return text
            }, "")
            columnList = columnList.replace(/, $/, "")

            // テーブル作成
            let psql = "CREATE TABLE " + subconst(this).tableName + " (" + columnList + ");"
            return this.exec(psql).then(() => {
                return Promise.resolve(true)
            })
        })
    }

    public checkExistence(): Promise<boolean> {
        let psql = "SELECT '" + subconst(this).tableName
            + "' FROM pg_class WHERE relkind='r' AND relname='"
            + subconst(this).tableName + "';"

        return this.exec(psql).then((result) => {
            if (0 < result.rowCount) {
                return Promise.resolve(true)
            } else {
                return Promise.resolve(false)
            }
        })
    }

    /**
     * recordの整合性をチェックする
     * @param  {Record}  record
     * @return {boolean} true: 整合性OK, false: 整合性NG
     */
    public checkRecord(record: Record): boolean {
        return record.columns.some((column: Column) => {
            if (column.required) {
                if (record.columns[column.name] == null) {
                    // 必須項目が無い
                    return true
                }
            }

            return false
        })
    }

    /**
     * objectをrecordに変換する
     * @param  {any}    object 変換前のPSQLから取得したobject
     * @return {Record}        変換後のRecord
     */
    public objectToRecord(object: any): Record {
        const SubRcord: typeof Record = subconst(this).RecordClass
        let record = new SubRcord()
        record.setValues(object)

        return record
    }

    private createCvArray(record: Record): string[] {
        let columnsText = ""
        let valuesText = ""
        record.columns.forEach((column: Column) => {
            const name = column.name
            const value = column.value
            if (value == null) {
                return
            }

            // 注意 必ずエスケープをかけてください
            columnsText += name
            if (column.type.jstype == Array) {
                // PSQL ARRAY
                valuesText += value.reduce((prev: string, value2: any) => {
                    return prev + escape(value2) + ", "
                }, "'{")
                valuesText = valuesText.replace(/, $/, "}'")
            } else if (column.type.jstype.prototype instanceof PsqlModel) {
                valuesText += "'" + escape(value.toPsqlString()) + "'"
            } else {
                valuesText += "'" + escape(value) + "'"
            }

            columnsText += ", "
            valuesText += ", "
        })
        columnsText = columnsText.replace(/, $/, "")
        valuesText = valuesText.replace(/, $/, "")

        return [columnsText, valuesText]
    }

    private createCvArrayForUpdate(record: Record): string[] {
        const cvArray = this.createCvArray(record)
        const columnsText = cvArray[0]
        const columnsTextArray = columnsText.split(", ")
        let valuesText = cvArray[1].split(", ").reduce((prev, c, i): string => {
            return prev + columnsTextArray[i] + "=" + c + ", "
        }, "")
        valuesText = valuesText.replace(/, $/, "")

        return [columnsText, valuesText]
    }

    /**
     * Tableにrecordをinsertする
     * @param  {Record}          record
     * @return {Promise<number>}        resolve(inserted data id)
     */
    public insert(record: Record): Promise<Record> {
        if (!this.checkRecord(record)) {
            throw new RecordMismatchError(record)
        }

        // INSERTに必要な情報を組み立てる
        const cvArray = this.createCvArray(record)
        const columnsText = cvArray[0]
        const valuesText = cvArray[1]

        let psql = "INSERT INTO " + subconst(this).tableName + " (" + columnsText + ") VALUES (" + valuesText + ") RETURNING " +
                subconst(this).columns.reduce((prev: string, column: Column, i: number): string => {
                    if (i == subconst(this).columns.length - 1) {
                        return prev + column.name
                    }
                    return prev + column.name + ", "
                }, "") + ";"
        return this.exec(psql).then((result) => {
            return Promise.resolve(this.objectToRecord(result.rows[0]))
        })
    }

    public search(searchText: string): Promise<Record[]> {
        // search実行
        let psql = "SELECT * FROM " + subconst(this).tableName + " WHERE " + searchText
        return this.exec(psql).then((result) => {
            let results = result.rows.map((row) => {
                return this.objectToRecord(row)
            })
            return results
        })
    }

    public update(record: Record): Promise<Record> {
        const cvArray = this.createCvArrayForUpdate(record)
        const columnsText = cvArray[0]
        const valuesText = cvArray[1]

        let psql = "UPDATE " + subconst(this).tableName + " SET " + valuesText +
            " WHERE id=" + record.getValue("id") + " RETURNING " + columnsText + ";"
        return this.exec(psql).then((result) => {
            return this.objectToRecord(result.rows[0])
        })
    }
}

export class Record {
    public static TableClass: typeof Table
    public columns: Column[]
    constructor() {
        // TableのColumnsをコピー
        this.columns = subconst(subconst(this).TableClass.prototype).columns.map((column: Column): Column => {
            return Object.assign({}, column)
        })
    }

    /**
     * setValues内部でPsqlModel変換するので、Stringで渡して下さい。
     * @param  {any}    oValues [description]
     * @return {[type]}         [description]
     */
    public setValues(oValues: any) {
        let values = Object.assign({}, oValues)
        this.columns.some((column: Column) => {
            Object.keys(values).some((key) => {
                const value = values[key]

                if (value == null) {
                    // nullを無視
                    return false;
                }

                if (key == column.name) {
                    // columnに登録してvaluesから削除
                    // 型チェック
                    // TODO convertを関数化
                    if (column.type.jstype == Array) {
                        column.value = value
                    } else if (column.type.jstype.prototype instanceof PsqlModel) {
                        column.value = column.type.jstype.fromPsql(value)
                    } else {
                        column.value = column.type.jstype(value)
                    }

                    delete values[key]
                    return true
                }

                return false
            })

            if (values.length <= 0) {
                // 終了
                return true
            }

            return false
        })
    }

    public getValue(key: string): any {
        let value: any
        this.columns.some((column) => {
            if (column.value == null) {
                return false
            }

            if (column.name == key) {
                if (column.type.jstype == Array) {
                    value = column.value
                } else if (column.type.jstype.prototype instanceof PsqlModel) {
                    value = column.value.getValue()
                } else {
                    value = column.type.jstype(column.value)
                }
                return true
            }
            return false
        })

        return value
    }

    public toObject(): any {
        const object = this.columns.reduce((prev: any, column: Column): any => {
            prev[column.name] = this.getValue(column.name)
            return prev
        }, {})

        return object
    }
}

/* 定義 */
Table.RecordClass = Record
Record.TableClass = Table
