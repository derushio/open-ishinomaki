import PsqlModel from "./PsqlModel"

export default class JsonbModel extends PsqlModel {
    private value: any

    constructor(object: any) {
        super()
        this.value = object
    }

    /**
     * [fromPsqlString description]
     * @param  {any}       rp [description]
     * @return {PsqlModel}     [description]
     */
    public static fromPsql(rp: any): JsonbModel {
        let jsonb
        jsonb = new JsonbModel(rp)

        return jsonb
    }

    public toPsqlString(): string {
        return JSON.stringify(this.value)
    }

    public getValue(): any {
        return this.value
    }
}
