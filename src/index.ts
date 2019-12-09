import { SVG } from '@svgdotjs/svg.js'

import poisson, { Point } from './poisson'

const WIDTH = 600
const HEIGHT = 600
const BLEED = 100
const MINIMUM_DISTANCE = 40
const K = 30
const DEBUG = true
const POINT_RADIUS = 1

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

const points: Point[] = []
const nextPoint = poisson({
  width: WIDTH + BLEED,
  height: HEIGHT + BLEED,
  minimumDistance: MINIMUM_DISTANCE,
  k: K,
})

const allPoints = (debug = false) => {
  const point = nextPoint()

  if (point === null) return

  drawPoint(point, debug)
  points.push(point)
  requestAnimationFrame(() => allPoints(debug))
}

allPoints(DEBUG)
