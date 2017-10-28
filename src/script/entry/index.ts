import riot from "riot"
require("../tag/test/test")

import UrlUtil from "../util/UrlUtil"

// TOPレベルtagにURLパラメーターを渡す
riot.mount("test", { urlParams: UrlUtil.getParams() })
