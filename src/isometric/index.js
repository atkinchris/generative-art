import drawIsoCube from './isoCube'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 800
container.appendChild(canvas)

const sketch = () => {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const size = Math.floor(width / 24)
  const grid = []
  const depth = 5
  const curve = 4

  const rowHeight = size
  const columnWidth = Math.sqrt((size ** 2) - ((size / 2) ** 2))
  const curveWidth = columnWidth * 2 * (curve + 1)
  const planes = Math.ceil(height / (rowHeight * 2))

  for (let y = 0; y <= height; y += rowHeight * 2) {
    const plane = y / (rowHeight * 2)

    for (let x = width; x >= -curveWidth; x -= curveWidth) {
      for (let z = 0; z <= depth; z += 1) {
        const yOffset = y - (z * rowHeight)
        grid.push({
          x: x - columnWidth,
          y: yOffset - (rowHeight * 0.5),
          z,
          plane,
        })

        for (let c = 0; c < curve; c += 1) {
          grid.push({
            x: x + (columnWidth * (0 + c)),
            y: yOffset + (rowHeight * 0.5 * c),
            z,
            plane,
          })
          grid.push({
            x: x + (columnWidth * ((curve * 2) - c)),
            y: yOffset + (rowHeight * 0.5 * c),
            z,
            plane,
          })
        }

        grid.push({
          x: x + (columnWidth * curve),
          y: yOffset + (rowHeight * 0.5 * curve),
          z,
          plane,
        })
      }
    }
  }

  grid
    .map(cube => Object.assign({}, cube, {
      size,
      colour: (cube.plane / planes) * 360,
    }))
    .forEach(cube => drawIsoCube(ctx, cube))
}

sketch()
