import drawIsoCube from './isoCube'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
canvas.width = 512
canvas.height = 512
container.appendChild(canvas)

const sketch = () => {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const size = Math.floor(width / 16)
  const grid = []
  const depth = 5
  const curve = 4

  const rowHeight = size
  const columnWidth = Math.sqrt((size ** 2) - ((size / 2) ** 2))
  const curveWidth = columnWidth * 2 * (curve + 1)
  const planes = Math.ceil(height / (rowHeight * 2))

  for (let y = 0; y <= height + (rowHeight * 2); y += rowHeight * 2) {
    const plane = y / (rowHeight * 2)

    for (let x = width; x >= -curveWidth; x -= curveWidth) {
      for (let z = depth; z >= 0; z -= 1) {
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

  const depthSort = (a, b) => {
    if (a.plane === b.plane) {
      if (a.y < b.y) {
        return -1
      }

      if (a.y > b.y) {
        return 1
      }

      return 0
    }

    if (a.plane > b.plane) {
      return -1
    }

    if (a.plane < b.plane) {
      return 1
    }

    return 0
  }

  const depthFilter = ({ z }) => {
    if (z === 0) {
      return Math.random() > 0.25
    }

    return true
  }

  grid
    .sort(depthSort)
    .filter(depthFilter)
    .map(cube => Object.assign({}, cube, {
      size,
      colour: cube.z === 0 && Math.random() < 0.4 && Math.random(),
    }))
    .forEach(cube => drawIsoCube(ctx, cube))
}

sketch()
