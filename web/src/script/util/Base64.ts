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

    public static encodeToBase64Image(img, mime_type) {
        // New Canvas
        var canvas = document.createElement('canvas')
        canvas.width  = img.width
        canvas.height = img.height
        // Draw Image
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        // To Base64
        return canvas.toDataURL(mime_type)
    }

    public static decodeToImage(base64: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                resolve(img)
            }
            img.onerror = (e) => {
                reject(e)
            }
            img.src = base64
        })
    }
}
