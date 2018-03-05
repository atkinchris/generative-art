import { vec3 } from 'gl-matrix'

const z = v => (Math.sin((Math.PI / 2) * v[1]) - Math.cos((Math.PI / 2) * v[0])) / 2

const buildGeometry = () => {
  const rightHalf = [
    [0.0, 1.0],
    [0.55, 0.5],
    [0.35, -0.5],
    [0.0, -1.0],
    [0.0, -0.5],
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

export {
  sortDepth,
  buildGeometry,
}
