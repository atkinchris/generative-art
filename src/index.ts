import { SVG } from '@svgdotjs/svg.js'
import Delaunator from 'delaunator'

import { intersect, isBetween } from './lines'
import poisson, { Point } from './poisson'
import Vector from './Vector'

const WIDTH = 600
const HEIGHT = 600
const BLEED = 100
const MINIMUM_DISTANCE = 60
const K = 30
const TRIANGLE_TEST_THRESHOLD = 100

const container = document.getElementById('drawing')!
const svg = SVG()
  .size(WIDTH, HEIGHT)
  .viewbox(BLEED, BLEED, WIDTH, HEIGHT)
  .addTo(container)

const points: Point[] = []
const nextPoint = poisson({
  width: WIDTH + BLEED * 2,
  height: HEIGHT + BLEED * 2,
  minimumDistance: MINIMUM_DISTANCE,
  k: K,
})

const allPoints = () => {
  const point = nextPoint()

  if (point === null) return Promise.resolve()
  points.push(point)

  allPoints()
}

allPoints()

interface Triangle {
  points: [Point, Point, Point]
  innerLines: Array<[Point, Point]>
}

const pointsAsTuples = points.map(point => [point.x, point.y])
const delauney = Delaunator.from(pointsAsTuples).triangles
const triangles: Triangle[] = []
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

for (let i = 0; i < delauney.length; i += 3) {
  triangles.push({
    points: [points[delauney[i]], points[delauney[i + 1]], points[delauney[i + 2]]],
    innerLines: [],
  })
}

const buildTriangle = (triangle: Triangle, offset = 0) => {
  if (offset > TRIANGLE_TEST_THRESHOLD) {
    throw Error('Could not find solution for triangle')
  }

  const activeSide = randomBetween(0, 2) + offset

  const a = new Vector(triangle.points[(0 + activeSide) % 3].x, triangle.points[(0 + activeSide) % 3].y)
  const b = new Vector(triangle.points[(1 + activeSide) % 3].x, triangle.points[(1 + activeSide) % 3].y)
  const c = new Vector(triangle.points[(2 + activeSide) % 3].x, triangle.points[(2 + activeSide) % 3].y)

  const bSubA = b.subtract(a)
  const cSubA = c.subtract(a)
  const projectedPointSubA = bSubA.multiply(bSubA.dot(cSubA)).divide(bSubA.dot(bSubA))
  const projectedPoint = a.add(projectedPointSubA)
  const translationVector = c.subtract(projectedPoint)

  if (!isBetween(a, b, projectedPoint, 1)) {
    buildTriangle(triangle, offset + 1)
    return
  }

  const stripes = randomBetween(5, 10)
  for (let i = 1; i < stripes; i += 1) {
    const multiplier = (1 / stripes) * i

    const a1 = a.add(translationVector.multiply(multiplier))
    const b1 = b.add(translationVector.multiply(multiplier))

    const acIntersect = intersect(a1, b1, a, c)
    const bcIntersect = intersect(a1, b1, b, c)

    if (acIntersect !== null && bcIntersect !== null) {
      triangle.innerLines.push([acIntersect, bcIntersect])
    }
  }
}

triangles.forEach(triangle => buildTriangle(triangle))

let index = 0

const drawTriangle = () => {
  if (index >= triangles.length) {
    return
  }

  const triangle = triangles[index]

  svg
    .polygon([
      triangle.points[0].x,
      triangle.points[0].y,
      triangle.points[1].x,
      triangle.points[1].y,
      triangle.points[2].x,
      triangle.points[2].y,
    ])
    .fill('none')
    .stroke({ width: 1, color: 'rgba(64,64,64,1)' })

  triangle.innerLines.forEach(line => {
    svg.line([line[0].x, line[0].y, line[1].x, line[1].y]).stroke({ width: 1, color: 'rgba(64,64,64,0.3)' })
  })

  index += 1
  requestAnimationFrame(drawTriangle)
}

drawTriangle()
