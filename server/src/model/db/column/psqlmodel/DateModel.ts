import PsqlModel from "./PsqlModel"

export default class DateModel extends PsqlModel {
    private value: Date

    constructor(date: Date) {
        super()
        this.value = date
    }

    /**
     * [fromPsqlString description]
     * @param  {any}       rp [description]
     * @return {PsqlModel}     [description]
     */
    public static fromPsql(rp: string): PsqlModel {
        let dateModel
        dateModel = new DateModel(new Date(rp))

        return dateModel
    }

    public toPsqlString(): any {
        return dateToString(this.value)
    }

    public getValue(): any {
        return this.value
    }
}

export function dateToString(date: Date): string {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}
