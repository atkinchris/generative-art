interface Params {
  width: number
  height: number
  minimumDistance: number
  k: number
}

interface Point {
  x: number
  y: number
}

const setupPoissonDisc = ({ width, height, minimumDistance, k }: Params) => {
  const randomX = () => width * Math.random()
  const randomY = () => height * Math.random()
  const distanceSquared = (x1: number, y1: number, x2: number, y2: number) =>
    (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
  const toIndexFromWorld = (x: number, y: number) => toIndexFromGrid(Math.floor(x / cellSize), Math.floor(y / cellSize))
  const toIndexFromGrid = (x: number, y: number) => x + y * gridWidth

  const cellSize = minimumDistance * Math.SQRT1_2
  const gridWidth = Math.ceil(width / cellSize)
  const gridHeight = Math.ceil(height / cellSize)
  const grid: Array<Point | null> = Array(gridWidth * gridHeight).fill(null)
  const pointQueue: Point[] = []
  let hasFirstPoint = false

  const addPoint = (x: number, y: number) => {
    const point: Point = { x, y }
    const index = toIndexFromWorld(x, y)
    grid[index] = point
    pointQueue.push(point)
    return point
  }

  const isValidPoint = ({ x, y }: Point): boolean => {
    if (x < 0 || x > width || y < 0 || y > height) {
      return false
    }

    const targetCol = Math.floor(x / cellSize)
    const targetRow = Math.floor(y / cellSize)

    // Check neighbouring cells
    for (let col = targetCol - 2; col <= targetCol + 2; col += 1) {
      for (let row = targetRow - 2; row <= targetRow + 2; row += 1) {
        if (col >= 0 && col < gridWidth && row >= 0 && row < gridHeight) {
          const index = toIndexFromGrid(col, row)
          const cell = grid[index]

          if (cell !== null && distanceSquared(x, y, cell.x, cell.y) <= Math.pow(minimumDistance, 2)) {
            return false
          }
        }
      }
    }

    return true
  }

  const nextPoint = (): Point | null => {
    if (!hasFirstPoint) {
      hasFirstPoint = true
      return addPoint(randomX(), randomY())
    }

    while (pointQueue.length > 0) {
      const index = Math.floor(pointQueue.length * Math.random())

      for (let i = 0; i < k; i += 1) {
        const distance = minimumDistance * (Math.random() + 1)
        const angle = 2 * Math.PI * Math.random()
        const candidatePoint: Point = {
          x: pointQueue[index].x + distance * Math.cos(angle),
          y: pointQueue[index].y + distance * Math.sin(angle),
        }

        if (isValidPoint(candidatePoint)) {
          return addPoint(candidatePoint.x, candidatePoint.y)
        }
      }

      pointQueue.splice(index, 1)
    }

    return null
  }

  return nextPoint
}

export default setupPoissonDisc
export { Point }
