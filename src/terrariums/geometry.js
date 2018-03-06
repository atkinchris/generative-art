import { vec3 } from 'gl-matrix'

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
  const vertices = [
    ...rightHalf,
    ...rightHalf.map(v => [v[0] * -1, v[1], v[2]]),
  ].map(v => vec3.fromValues(v[0], v[1], z(v)))

  const faces = [
    vertices.slice(0, rightHalf.length),
    vertices.slice(rightHalf.length),
  ]

  return {
    vertices,
    faces,
  }
}

const sortDepth = (a, b) => {
  const avg = arr => arr.reduce((out, value) => out + value[2], 0) / arr.length
  return avg(a) < avg(b)
}

const midPoint = (p1, p2) => [
  p1[0] + ((p2[0] - p1[0]) / 2),
  p1[1] + ((p2[1] - p1[1]) / 2),
]

export {
  sortDepth,
  buildGeometry,
  midPoint,
}
