import { SVG } from '@svgdotjs/svg.js'

interface Point {
  x: number
  y: number
}

const WIDTH = 600
const HEIGHT = 600
const BLEED = 100
const MINIMUM_DISTANCE = 40
const K = 30
const DEBUG = true
const POINT_RADIUS = 1

const xMin = 0
const xMax = WIDTH + BLEED * 2
const yMin = 0
const yMax = HEIGHT + BLEED * 2
const cellSize = MINIMUM_DISTANCE * Math.SQRT1_2
const gridWidth = Math.ceil(xMax - xMin / cellSize)
const gridHeight = Math.ceil(yMax - yMin / cellSize)
const grid: Array<Point | null> = Array(gridWidth * gridHeight).fill(null)

const container = document.getElementById('drawing')!
const svg = SVG()
  .size(WIDTH, HEIGHT)
  .viewbox(BLEED, BLEED, WIDTH, HEIGHT)
  .addTo(container)

const drawPoint = ({ x, y }: Point, showMinimumDistance = false) => {
  svg
    .circle(POINT_RADIUS * 2)
    .move(x - POINT_RADIUS, y - POINT_RADIUS)
    .fill('blue')

  if (showMinimumDistance) {
    svg
      .circle(MINIMUM_DISTANCE * 2)
      .move(x - MINIMUM_DISTANCE, y - MINIMUM_DISTANCE)
      .stroke('rgba(0, 0, 255, 0.2)')
      .fill('none')
  }
}

const randomX = () => xMax - xMin * Math.random()
const randomY = () => yMax - yMin * Math.random()
const distanceSquared = (x1: number, y1: number, x2: number, y2: number) =>
  (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
const toIndexFromWorld = (x: number, y: number) => toIndexFromGrid(Math.floor(x / cellSize), Math.floor(y / cellSize))
const toIndexFromGrid = (x: number, y: number) => x + y * gridWidth

const pointQueue: Point[] = []
const points: Point[] = []

const addPoint = (x: number, y: number) => {
  const point: Point = { x, y }
  const index = toIndexFromWorld(x, y)
  grid[index] = point
  pointQueue.push(point)
  return point
}

const isValidPoint = ({ x, y }: Point): boolean => {
  if (x < xMin || x > xMax - xMin || y < yMin || y > yMax - yMin) {
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

        if (cell !== null && distanceSquared(x, y, cell.x, cell.y) <= Math.pow(MINIMUM_DISTANCE, 2)) {
          return false
        }
      }
    }
  }

  return true
}

const nextPoint = (): Point | null => {
  if (points.length === 0) {
    return addPoint(randomX(), randomY())
  }

  while (pointQueue.length > 0) {
    const index = Math.floor(pointQueue.length * Math.random())

    for (let i = 0; i < K; i += 1) {
      const distance = MINIMUM_DISTANCE * (Math.random() + 1)
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

const allPoints = (debug = false) => {
  const point = nextPoint()

  if (point === null) return

  drawPoint(point, debug)
  points.push(point)
  requestAnimationFrame(() => allPoints(debug))
}

allPoints(DEBUG)
