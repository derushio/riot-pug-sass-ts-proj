/**
 * URLのツール群
 */
export default class UrlUtil {
    private constructor() {}

    /**
     * urlからparamを取得
     * @return {Params} [description]
     */
    public static getParams(): UrlParams {
        // "string=string"[] に分解
        const pairs: string[] = location.search.substring(1).split('&')

        // {[key: string]: string}[] に分解
        const params: UrlParams = pairs.reduce((prev: UrlParams, pair: string) => {
            const kv: string[] = pair.split('=')
            prev[kv[0]] = kv[1]
            return prev
        }, {})

        return params
    }
}

export interface UrlParams {
    [key: string]: string
}
