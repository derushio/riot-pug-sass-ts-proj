import path from 'path'
import webpack from 'webpack'

export default {
    context: path.join(__dirname, "../tmp/script/entry"),
    entry: {
        "index": "./index.ts"
        // ここにエントリポイントを増やしてください
    },
    output: {
        path: path.join(__dirname, "../dist/script/entry"),
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.ts']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "post",
                loader: 'ts-loader'
            }
        ]
    }
}
