/**
 * PSQLのモデルクラスはすべてこれを継承する
 * TODO: abstractやinterfaceにする
 * @param  {string} str [description]
 * @return {[type]}     [description]
 */
export default class PsqlModel {
    public static fromPsql(rp: any): PsqlModel {
        return new PsqlModel()
    }

    public toPsqlString(): string {
        return ""
    }

    public getValue(): any {
        return null
    }
}
