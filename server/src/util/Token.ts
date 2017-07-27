export declare function require(path: string): any
const uuid = require("node-uuid")

export const createToken = (): string => {
    return uuid.v4()
}
