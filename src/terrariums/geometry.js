import { vec3 } from 'gl-matrix'

import { randomApprox } from './random'

const z = v => (Math.sin((Math.PI / 2) * v[1]) - Math.cos((Math.PI / 2) * v[0])) / 2

const buildGeometry = () => {
  const rightHalf = [
    [0.0, 1.0], // Stem
    [0.05, 1.0], // Stem
    [0.04, 0.7], // Stem
    [0.25, 0.6],
    [0.52, 0.15], // Upper-outer
    [0.35, -0.5], // Lower-outer
    [0.0, -1.0], // Point
    [0.0, -0.75],
    [0.0, -0.5],
    [0.0, -0.25],
    [0.0, 0.0],
    [0.0, 0.25],
    [0.0, 0.5],
  ]
  const vertices = [...rightHalf, ...rightHalf.map(v => [v[0] * -1, v[1], v[2]])].map(v =>
    vec3.fromValues(v[0], v[1], z(v))
  )

  const faces = [vertices.slice(0, rightHalf.length), vertices.slice(rightHalf.length)]

  return {
    vertices,
    faces,
  }
}

const sortDepth = (a, b) => {
  const avg = arr => arr.reduce((out, value) => out + value[2], 0) / arr.length
  return avg(a) < avg(b)
}

const midPoint = (p1, p2) => [p1[0] + (p2[0] - p1[0]) / 2, p1[1] + (p2[1] - p1[1]) / 2]

const angleBetween = (p1, p2) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0])

const interpolate = points => {
  const output = points.reduce((out, point, i) => {
    if (i === points.length - 1) return out

    const next = points[(i + 1) % points.length]
    const mid = midPoint(point, next)
    out.push(point)
    out.push(mid)

    return out
  }, [])

  output.push(points[points.length - 1])
  return output
}

const deform = (points, deviation = 1) =>
  points.map(point => [point[0] + randomApprox() * deviation, point[1] + randomApprox() * deviation])

const isInside = (bounds, point) =>
  point[0] > bounds.left && point[0] < bounds.right && point[1] > bounds.top && point[1] < bounds.bottom

export { sortDepth, buildGeometry, midPoint, angleBetween, interpolate, isInside, deform }
