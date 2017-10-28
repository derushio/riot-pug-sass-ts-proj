import * as $ from "jquery"
import { AjaxFailError } from "../define/Error"

/**
 * ajaxのasync化
 */
export default async function AsyncAjax(type: string, url: string,
        headers: Headers, data: HttpBodyData): Promise<string> {
    return new Promise<string>((resolve: Function, reject: Function): void => {
        const sendHeaders: Headers = headers || {}

        if (sendHeaders["Content-type"] == null) {
            sendHeaders["Content-type"] = "Application/json"
        }

        $.ajax({
            type: type,
            url: url,
            headers: sendHeaders,
            data: (typeof data == Object.name.toLowerCase())? JSON.stringify(data): data
        }).done((response: string) => {
            resolve(response)
        }).fail((jqXHR, textStatus, MessageThrown) => {
            reject(new AjaxFailError(jqXHR))
        })
    })
}

export interface Headers {
    [key: string]: string | number
}

export interface HttpBodyData {
    [key: string]: any
}
