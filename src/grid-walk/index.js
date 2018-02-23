import { knuthShuffle } from 'knuth-shuffle'

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const gridSize = 16
  const points = []

  const distanceFrom = target => (point) => {
    const { x, y } = point
    const dX = (x - target.x) ** 2
    const dY = (y - target.y) ** 2
    return Object.assign({}, point, {
      distance: Math.round(dX + dY),
    })
  }
  const distanceSort = (a, b) => a.distance - b.distance
  const adjacentsSort = (a, b) => a.adjacents.length - b.adjacents.length

  p.setup = () => {
    p.createCanvas(width, height)
    p.noFill()

    const columns = Math.floor(width / gridSize)
    const rows = Math.floor(height / gridSize)

    const rowHeight = gridSize
    const columnWidth = Math.sqrt((gridSize ** 2) - ((gridSize / 2) ** 2))

    for (let iX = 0; iX <= columns; iX += 1) {
      const x = iX * columnWidth
      const yOffset = iX % 2 ? gridSize / 2 : 0

      for (let iY = 0; iY < rows; iY += 1) {
        const y = (iY * rowHeight) + yOffset
        points.push({ x, y, adjacents: [] })
      }
    }

    points.forEach(({ x, y }) => p.point(x, y))
  }

  p.draw = () => {
    knuthShuffle(points)
    const pool = points.filter(point => point.adjacents.length < 2).sort(adjacentsSort)
    const a = pool[0]

    if (!a) {
      p.noLoop()
      console.log('Loop over')
    }

    const sortedPoints = pool.map(distanceFrom(a)).sort(distanceSort)
    const nearestFreePoints = sortedPoints.filter(point => (
      point.distance === gridSize ** 2 &&
      point.adjacents.length < 2 &&
      point.adjacents.indexOf(a) === -1
    ))

    const b = knuthShuffle(nearestFreePoints)[0]

    if (!b) {
      return
    }

    a.adjacents.push(b)
    b.adjacents.push(a)

    p.line(a.x, a.y, b.x, b.y)
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
