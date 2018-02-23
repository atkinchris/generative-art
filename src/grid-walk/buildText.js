import vectorizeText from 'vectorize-text'

import Triangle from './triangle'

const buildText = (width, height, text) => {
  const { positions, cells } = vectorizeText(text.toUpperCase(), {
    font: 'Sans-serif',
    triangles: true,
    width: width * 0.75,
    textBaseline: 'hanging',
  })

  const offsetPositions = positions.map(position => [
    position[0] + (width * 0.12),
    position[1] + ((height / 2) - (text.length * 8)),
  ])

  const triangles = cells.map(cell => new Triangle([
    offsetPositions[cell[0]],
    offsetPositions[cell[1]],
    offsetPositions[cell[2]],
  ]))

  return point => triangles.some(tri => tri.contains([point.x, point.y]))
}

export default buildText
