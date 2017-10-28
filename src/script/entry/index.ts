import riot from "riot"
require("../tag/test/test")

import UrlUtil from "../util/UrlUtil"

// TOPレベルtagにURLパラメーターを渡す
// 例 `inde.html?text=test&inner-text=inner-test`
riot.mount("test", { urlParams: UrlUtil.getParams() })
