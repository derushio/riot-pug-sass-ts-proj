import path from 'path'
import webpack from 'webpack'

export default {
  context: path.join(__dirname, '../tmp/script/entry'),
  entry: {
    'index': './index.ts'
  },
  output: {
    path: path.join(__dirname, '../docs/script/entry'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'post',
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}
