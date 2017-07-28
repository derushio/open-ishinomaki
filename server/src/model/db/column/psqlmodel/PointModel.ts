import PsqlModel from "./PsqlModel"

export default class PointModel extends PsqlModel {
    private x: number
    private y: number

    constructor(x, y) {
        super()
        this.x = x
        this.y = y
    }

    /**
     * [fromPsqlString description]
     * @param  {any}       rp [description]
     * @return {PsqlModel}     [description]
     */
    public static fromPsql(rp: any): PointModel {
        console.log(rp)
        let pointModel = new PointModel(rp.x, rp.y)
        return pointModel
    }

    public toPsqlString(): string {
        return "(" + this.x + ", " + this.y + ")"
    }

    public getValue(): any {
        return { x: this.x, y: this.y }
    }
}
