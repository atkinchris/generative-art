import { knuthShuffle } from 'knuth-shuffle'

import buildText from './buildText'

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const gridSize = 6
  const maxAttempts = 1000
  const maxAdjacents = 2
  const passes = 3
  const points = []
  const lines = []

  const distanceSqFrom = (a, b) => {
    const dX = (a.x - b.x) ** 2
    const dY = (a.y - b.y) ** 2
    return Math.round(dX + dY)
  }

  const buildLine = (list, discard) => {
    knuthShuffle(list)
    const aIndex = 0
    const bIndex = list.findIndex(point => distanceSqFrom(list[0], point) === gridSize ** 2)

    if (bIndex === -1) return null

    const b = list.splice(bIndex, 1)[0]
    const a = list.splice(aIndex, 1)[0]

    b.adjacents += 1
    a.adjacents += 1
    discard.push(a)
    discard.push(b)

    const colour = ((a.y / height) * 96) + 128

    return {
      x1: a.x,
      x2: b.x,
      y1: a.y,
      y2: b.y,
      colour,
    }
  }

  p.setup = () => {
    console.time('Setup')
    p.createCanvas(width, height)
    p.noFill()
    p.noLoop()
    p.colorMode(p.HSB, 255)

    const inText = buildText(width, height, 'Chris')
    const columns = Math.ceil(width / gridSize)
    const rows = Math.ceil(height / gridSize)

    const rowHeight = gridSize
    const columnWidth = Math.sqrt((gridSize ** 2) - ((gridSize / 2) ** 2))

    for (let iX = 0; iX <= columns; iX += 1) {
      const x = iX * columnWidth
      const yOffset = iX % 2 ? gridSize / 2 : 0

      for (let iY = 0; iY < rows; iY += 1) {
        const y = (iY * rowHeight) + yOffset
        const point = { x, y, adjacents: 0 }

        if (!inText(point)) {
          points.push(point)
        }
      }
    }

    for (let pass = 0; pass < passes; pass += 1) {
      const discard = []
      let attempts = 0

      while (attempts < maxAttempts) {
        const line = buildLine(points, discard)

        if (line) {
          lines.push(line)
        } else {
          attempts += 1
        }
      }

      discard.forEach((point) => {
        if (point.adjacents < maxAdjacents) {
          points.push(point)
        }
      })
    }

    console.timeEnd('Setup')
  }

  p.draw = () => {
    lines.forEach((line) => {
      p.stroke(line.colour, 255, 255)
      p.line(line.x1, line.y1, line.x2, line.y2)
    })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
