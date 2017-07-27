import Table, {Record} from "../model/db/table/Table"
import {subconst} from "../util/ClassUtil"

export default class CommonError extends Error {
    public extra: any

    /**
     * @param {String} message メッセージ
     * @param {Object} extra 付随する情報
     * @param {Array} extrakeys 付随する情報のエントリ
     */
    constructor(message, extra) {
        super(message)

        this.extra = extra
    }
}

export class ClassMismatchError extends CommonError {
    /**
     * @param {Object} needClass 求めているクラス
     * @param {Object} targetObject 対象のオブジェクト
     * @param {String} name 対象の名前
     */
    constructor(needClass, targetObject, name) {
        let extra
        let message

        if (targetObject == null) {
            extra = {}
            message = name + " が存在しません"
        } else {
            extra = {
                targetObject: Object.assign(targetObject)
            }
            message = name + " は '" + needClass.name + "' ではありません"
        }

        super(message, extra)
    }
}

export class AjaxFailError extends CommonError {
    /**
     * @param {Object} jqXHR
     */
    constructor(jqXHR) {
        let extra = {
            jqXHR: jqXHR
        };
        let message = jqXHR.responseText;

        super(message, extra);
    }
}

export class CannotCreateInstanceError extends CommonError {
    constructor(target) {
        let message = target.constructor.name + " はインスタンスを生成できません"
        super(message, null)
    }
}

export class NullObjectError extends CommonError {
    constructor(name) {
        let message = name + " が存在しません"
        super(message, null)
    }
}

export class SqlExecFailError extends CommonError {
    constructor(error: any) {
        let message = "SQL実行が失敗しました"
        let extra = error

        super(message, extra)
    }
}

export class TableNotFoundError extends CommonError {
    constructor(table: Table) {
        let message = subconst(table).name + " が存在しませんでした"
        super(message, null)
    }
}

export class RecordMismatchError extends CommonError {
    constructor(record: Record) {
        let message = "Recordが正しくありません"
        let extra = { record: record }
        super(message, extra)
    }
}

export class UserNotFoundError extends CommonError {
    constructor(username: string) {
        const message = username + "が見つかりませんでした"
        super(message, null)
    }
}
