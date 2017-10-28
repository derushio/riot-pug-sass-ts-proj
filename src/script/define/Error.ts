function ExtendableBuiltin(ec: typeof Error): typeof Error {
    function ExtendableBuiltin() {
        ec.apply(this, arguments)
    }
    ExtendableBuiltin.prototype = Object.create(ec.prototype)
    ;(<any>Object).setPrototypeOf(ExtendableBuiltin, ec)

    return (<typeof Error>ExtendableBuiltin)
}

export default class CommonError extends ExtendableBuiltin(Error) {
    public extra: any

    /**
     * @param message メッセージ
     * @param extra 付随する情報
     */
    constructor(message: string, extra: any) {
        super(message)

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable : false,
            value : message,
            writable : true,
        })

        if (Error.hasOwnProperty('captureStackTrace')) {
            ;(<any>Error).captureStackTrace(this, this.constructor)
        } else {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                enumerable : false,
                value : (<any>new Error(message)).stack,
                writable : true,
            })
        }

        this.extra = extra
    }
}

/**
 * ajaxが失敗した時のエラー
 * @param jqXHR
 */
export class AjaxFailError extends CommonError {
    constructor(jqXHR) {
        let extra = {
            jqXHR: jqXHR
        }
        let message = jqXHR.responseText

        super(message, extra)
    }
}

/**
 * WebSocketを開くのに失敗したときのエラー
 */
export class WebSocketFailOpenError extends CommonError {
    constructor() {
        let message = "WebSocketFailOpen: null"
        super(message, null)
    }
}
