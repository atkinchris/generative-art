import drawIsoCube from './isoCube'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
canvas.width = 400
canvas.height = 400
container.appendChild(canvas)

const depthSort = (a, b) => a.y - b.y

const sketch = () => {
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const size = Math.floor(width / 12)
  const grid = []
  const depth = 5

  const rowHeight = size
  const columnWidth = Math.sqrt((size ** 2) - ((size / 2) ** 2))

  let offset = false

  for (let x = 0; x <= width + columnWidth; x += columnWidth * 2) {
    const yOffset = offset ? size / 2 : 0
    offset = !offset

    for (let y = height; y > yOffset; y -= rowHeight) {
      for (let z = 0; z < depth; z += 1) {
        grid.push({
          x: x + (columnWidth * (z % 2)) + (columnWidth * 0),
          y: y - (rowHeight * ((z * 0.5) + 1)),
        })
        grid.push({
          x: x + (columnWidth * (z % 2)) + (columnWidth * 0),
          y: y - (rowHeight * ((z * 0.5) + 0)),
        })
      }
    }
  }

  grid
    .sort(depthSort)
    .map(cube => Object.assign({}, cube, {
      size,
      colour: (cube.y / height) * 360,
    }))
    .forEach(cube => drawIsoCube(ctx, cube))
}

sketch()
