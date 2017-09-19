import path from 'path'
import webpack from 'webpack'

export default {
    context: path.join(__dirname, "./tmp/script-es5/entry"),
    entry: {
        "index": "./index.js",
        // ここにエントリポイントを増やしてください
    },
    output: {
        path: path.join(__dirname, "./dist/script/entry"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.js']
    },
}
