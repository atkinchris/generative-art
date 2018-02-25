import vectorizeText from 'vectorize-text'

import Triangle from './triangle'

const buildText = (width, height, text) => {
  const { positions, cells } = vectorizeText(text.toUpperCase(), {
    font: 'Sans-serif',
    triangles: true,
    width: width * 0.85,
    textBaseline: 'hanging',
  })

  const bounds = positions.reduce((out, [x, y]) => ({
    top: y < out.top ? y : out.top,
    bottom: y > out.bottom ? y : out.bottom,
    left: x < out.left ? x : out.left,
    right: x > out.right ? x : out.right,
  }), {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })

  const offsetPositions = positions.map(position => [
    position[0] + ((width / 2) - Math.round(bounds.right / 2)),
    position[1] + ((height / 2) - Math.round(bounds.bottom / 2)),
  ])

  const triangles = cells.map(cell => new Triangle([
    offsetPositions[cell[0]],
    offsetPositions[cell[1]],
    offsetPositions[cell[2]],
  ]))

  return {
    inText: point => triangles.some(tri => tri.contains([point.x, point.y])),
    triangles,
    bounds,
  }
}

export default buildText
