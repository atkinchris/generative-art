import { vec3 } from 'gl-matrix'

const buildGeometry = () => {
  const vertices = [
    [-1.0, -1.0, -1.0], // Front-Bottom-Left
    [1.0, -1.0, -1.0], // Front-Bottom-Right
    [-1.0, -1.0, 1.0], // Rear-Bottom-Left
    [1.0, -1.0, 1.0], // Rear-Bottom-Right
    [-1.0, 1.0, -1.0], // Front-Top-Left
    [1.0, 1.0, -1.0], // Front-Top-Right
    [-1.0, 1.0, 1.0], // Rear-Top-Left
    [1.0, 1.0, 1.0], // Rear-Top-Right
  ].map(v => vec3.fromValues(v[0], v[1], v[2]))

  const faces = [
    [vertices[0], vertices[1], vertices[5], vertices[4]], // Front
    [vertices[2], vertices[3], vertices[7], vertices[6]], // Rear
    [vertices[0], vertices[1], vertices[3], vertices[2]], // Bottom
    [vertices[4], vertices[5], vertices[7], vertices[6]], // Top
    [vertices[0], vertices[2], vertices[6], vertices[4]], // Left
    [vertices[1], vertices[3], vertices[7], vertices[5]], // Right
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
