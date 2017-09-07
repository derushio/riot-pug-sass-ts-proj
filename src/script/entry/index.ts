declare function require(name: string): any

import riot from "riot"
const test = require("../tag/test.tag")

riot.mount("*")
