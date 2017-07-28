import { CannotCreateInstanceError } from "../define/Error"

declare function escape(text:string): string
declare function unescape(text:string): string

/**
 * Base64 encode/decode class
 */
export default class Base64 {
    constructor() {
        throw new CannotCreateInstanceError(Base64)
    }

    /**
     * textをBase64でエンコード
     * @param  {string} text エンコード前テキスト
     * @return {string}      エンコード後テキスト
     */
    public static encode(text: string): string {
        return btoa(unescape(encodeURIComponent(text)))
    }

    /**
     * base64をデコード
     * @param  {string} base64 エンコード後テキスト
     * @return {string}        エンコード前テキスト
     */
    public static decode(base64: string): string {
        return decodeURIComponent(escape(atob(base64)))
    }
}
