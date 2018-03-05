import mat3 from 'gl-mat3'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

container.appendChild(canvas)

const sortMax = (prop, desc) => (a, b) => {
  const max = x => Math.max(...x.map(v => v[prop]))
  return desc ? max(a) < max(b) : max(a) > max(b)
}

const mat3Column = (m, col) => [
  m[0 + col],
  m[3 + col],
  m[6 + col],
]

const draw = () => {
  const width = 400
  const height = 400
  canvas.width = width
  canvas.height = height

  const size = canvas.width / 2
  const rotation = mat3.rotate(mat3.create(), mat3.create(), 0.5)

  const vertices = [
    [-1.0, -1.0, -1.0], // Front-Bottom-Left
    [1.0, -1.0, -1.0], // Front-Bottom-Right
    [-1.0, -1.0, 1.0], // Rear-Bottom-Left
    [1.0, -1.0, 1.0], // Rear-Bottom-Right
    [-1.0, 1.0, -1.0], // Front-Top-Left
    [1.0, 1.0, -1.0], // Front-Top-Right
    [-1.0, 1.0, 1.0], // Rear-Top-Left
    [1.0, 1.0, 1.0], // Rear-Top-Right
  ]

  for (let index = 0; index < vertices.length; index += 1) {
    const vertex = vertices[index]

    const out = mat3.create()

    console.log(out, mat3Column(out, 1))

    // const out = mat3.multiply(mat3.create(), vertex, rotation)
    // vertices[index] = out
  }

  console.log(vertices)

  const faces = [
    [vertices[0], vertices[1], vertices[5], vertices[4]], // Front
    [vertices[2], vertices[3], vertices[7], vertices[6]], // Rear
    [vertices[0], vertices[1], vertices[3], vertices[2]], // Bottom
    [vertices[4], vertices[5], vertices[7], vertices[6]], // Top
    [vertices[0], vertices[2], vertices[6], vertices[4]], // Left
    [vertices[1], vertices[3], vertices[7], vertices[5]], // Right
  ]
    .sort(sortMax(0))
    .sort(sortMax(1))
    .sort(sortMax(2, true))

  const vertexShader = vertex => [
    vertex[0] + (vertex[2] * ((1 / 2) * Math.cos(0.5))),
    vertex[1] + (vertex[2] * ((1 / 2) * Math.sin(0.5))),
  ]

  const toWorld = vertex => [
    vertex[0] * (size / 2),
    vertex[1] * (size / 2) * -1,
  ]

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = 'white'

  faces.forEach((face) => {
    ctx.beginPath()

    face.forEach((vertex, index) => {
      const transformed = vertexShader(vertex)
      const world = toWorld(transformed)
      if (index === 0) {
        ctx.moveTo(world[0], world[1])
      } else {
        ctx.lineTo(world[0], world[1])
      }
    })

    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  })
}

draw()
