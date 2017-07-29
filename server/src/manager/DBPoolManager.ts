export declare function require(name: string): any
let pg = require("pg")

import { CannotCreateInstanceError, SqlExecFailError, TableNotFoundError } from "../define/Error"

import Table, {Record} from "../model/db/table/Table"
import Column from "../model/db/column/Column"

/**
 * DBPoolManager
 */
export default class DBPoolManager {
    private static instance: DBPoolManager
    private pool: any
    private client: any

    private static DB_CONF = {
        user: "root",
        database: "open_ishinomaki",
        password: "KsJaA4uQ",
        host: "localhost",
        port: 5432,
        max: 10,
        idleTimeoutMillis: 30000
    }

    constructor() {
        if (DBPoolManager.instance) {
            throw new CannotCreateInstanceError(DBPoolManager.name)
        }
        this.pool = new pg.Pool(DBPoolManager.DB_CONF)
    }

    /**
     * @return {Promise} resolve(instance), reject(error)
     */
    public static getInstance(): Promise<DBPoolManager> {
        if (this.instance == null) {
            this.instance = new DBPoolManager()
        }

        return new Promise((resolve, reject) => {
            if (this.instance.client) {
                resolve(this.instance)
                return
            }

            this.instance.pool.connect((error, client, done) => {
                if (error) {
                    reject(error)
                    return
                }

                this.instance.client = client
                resolve(this.instance)
            })
        })
    }

    /**
     * @param {String} psql 実行psqlテキスト
     * @param {Array} varray 実行psqlテキストに付随する変数配列
     * @return {Promise} resolve(result), reject(error)
     */
    public exec(psql: string, varray?: any[]): Promise<any> {
        console.log("exec-psql: " + psql)
        return new Promise((resolve, reject) => {
            this.client.query(psql, varray, (error, result) => {
                if (error) {
                    reject(new SqlExecFailError(error))
                    return
                }

                resolve(result)
            })
        })
    }
}

export function escape(value: any): any {
    if (value instanceof Array) {
        return value.map((value1: any) => {
            return escape(value1)
        })
    } else if (value instanceof Object) {
        return Object.keys(value).reduce((prev: any, key: string) => {
            prev[key] = escape(value[key])
            return prev
        }, {})
    } else if (value == null || typeof value != String.name.toLowerCase()) {
        return value
    }
    return value.replace(/'/g, "''")
}
