import ColumnType from "./ColumnType"

/**
 * psql カラム設定
 * @param  {string}     name     カラム名
 * @param  {ColumnType} type     カラムの型
 * @param  {boolean}    required 必須項目か
 * @param  {string}     check    制限項目
 * @param  {boolean}    primary  プライマリキーか
 */
export default class Column {
    public name: string
    public type: ColumnType
    public required: boolean
    public check: string
    public primary: boolean
    public value: any

    constructor(name: string, type: ColumnType, required?: boolean, check?: string, primary?: boolean, value?: any) {
        this.name = name
        this.type = type
        this.required = required
        this.check = check
        this.primary = primary
        // 初期値
        this.value = value
    }

    /**
     * CREATE TABLE時のカラム宣言を取得
     * @return {string} カラム宣言
     */
    public getCreateText(): string {
        let text = this.name + " " + this.type.type
        if (this.required) {
            text += " NOT NULL"
        }

        if (this.check) {
            text += " CHECK (" + this.check + ")"
        }

        if (this.primary) {
            text += " PRIMARY KEY"
        }

        return text
    }
}
