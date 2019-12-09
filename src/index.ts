import { SVG } from '@svgdotjs/svg.js'
import Delaunator from 'delaunator'

import poisson, { Point } from './poisson'

const WIDTH = 600
const HEIGHT = 600
const BLEED = 100
const MINIMUM_DISTANCE = 60
const K = 30

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

type TuplePoint = [number, number]

const pointsAsTuples: TuplePoint[] = points.map(point => [point.x, point.y])
const delauney = Delaunator.from(pointsAsTuples).triangles
const triangles: Array<[TuplePoint, TuplePoint, TuplePoint]> = []

for (let i = 0; i < delauney.length; i += 3) {
  triangles.push([pointsAsTuples[delauney[i]], pointsAsTuples[delauney[i + 1]], pointsAsTuples[delauney[i + 2]]])
}

let index = 0

const drawTriangle = () => {
  if (index >= triangles.length) {
    return
  }

  const triangle = triangles[index]

  index += 1
  svg
    .polygon(triangle)
    .fill('none')
    .stroke({ width: 1, color: 'rgba(64,64,64,1)' })

  requestAnimationFrame(drawTriangle)
}

drawTriangle()
