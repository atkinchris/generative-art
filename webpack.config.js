const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildPages = require('./webpack.pages')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}
const { entry, plugins } = buildPages(paths)

const common = {
  entry,
  output: {
    path: paths.DEST,
    publicPath: './',
    filename: '[name]/index.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
      }),
    }],
  },
  plugins: [
    new CleanWebpackPlugin([paths.DEST]),
    new ExtractTextPlugin('[name].css'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      open: false,
      ui: false,
      notify: false,
      server: {
        baseDir: [paths.DEST],
      },
    }),
    ...plugins,
  ],
}

module.exports = common
