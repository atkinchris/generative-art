/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const template = './src/layout.html'

const pages = [
  { name: 'georg-nees', title: 'Georg Nees' },
  { name: 'circle-packing', title: 'Circle Packing' },
  { name: 'watercolour', title: 'Watercolour' },
  { name: 'triangle-subdivision', title: 'Triangle Subdivision' },
  { name: 'line-landscape', title: 'Line Landscape' },
  { name: 'clock-of-clocks', title: 'Clock of Clocks' },
  { name: 'concentric-circles', title: 'Concentric Circles' },
  { name: 'flow-field', title: 'Perlin Flow Field' },
  { name: 'text-pathing', title: 'Text Pathing' },
  { name: 'grid-walk', title: 'Grid Walk' },
]

const buildPages = ({ SRC }) => {
  const entry = pages.reduce((out, { name }) => ({
    ...out,
    [name]: path.join(SRC, name),
  }), {})

  const plugins = []

  pages.forEach(({ name, title }) => {
    plugins.push(new HtmlWebpackPlugin({
      title,
      filename: `${name}/index.html`,
      chunks: [name],
      inject: false,
      template,
    }))

    const thumbnail = `${name}/thumbnail.png`

    plugins.push(new CopyWebpackPlugin([
      { from: path.join(SRC, thumbnail), to: thumbnail },
    ]))
  })

  return { entry, plugins }
}

module.exports = buildPages
