const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

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
    rules: [],
  },
  plugins: [
    new CleanWebpackPlugin([paths.DEST]),
    new CopyWebpackPlugin(['public']),
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
