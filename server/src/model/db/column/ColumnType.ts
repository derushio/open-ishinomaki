export default class ColumnType {
    public type: string
    public jstype: any

    constructor(type: string, jstype: any) {
        this.type = type
        this.jstype = jstype
    }
}
