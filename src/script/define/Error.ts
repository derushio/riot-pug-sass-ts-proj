
/**
 * @param {String} message メッセージ
 * @param {Object} extra 付随する情報
 * @param {Array} extrakeys 付随する情報のエントリ
 */
export default class CommonError extends Error {
    public extra: any

    constructor(message, extra) {
        super(message)

        this.extra = extra
    }
}

/**
 * @param {Object} needClass 求めているクラス
 * @param {Object} targetObject 対象のオブジェクト
 * @param {String} name 対象の名前
 */
export class ClassMismatchError extends CommonError {
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

/**
 * @param {Object} jqXHR
 */
export class AjaxFailError extends CommonError {
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
        let message = target.name + " はインスタンス生成に失敗しました"
        super(message, null)
    }
}

export class NullObjectError extends CommonError {
    constructor(name) {
        let message = name + " が存在しません"
        super(message, null)
    }
}

export class WebSocketFailOpenError extends CommonError {
    constructor() {
        let message = "WebSocketの開始に失敗しました"
        super(message, null)
    }
}
