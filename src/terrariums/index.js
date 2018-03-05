const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

container.appendChild(canvas)

const sortMax = (prop, desc) => (a, b) => {
  const max = x => Math.max(...x.map(v => v[prop]))
  return desc ? max(a) < max(b) : max(a) > max(b)
}

const draw = () => {
  const width = 400
  const height = 400
  canvas.width = width
  canvas.height = height

  const size = canvas.width / 2

  const vertices = [
    { x: -1.0, y: -1.0, z: -1.0 }, // Front-Bottom-Left
    { x: 1.0, y: -1.0, z: -1.0 }, // Front-Bottom-Right
    { x: -1.0, y: -1.0, z: 1.0 }, // Rear-Bottom-Left
    { x: 1.0, y: -1.0, z: 1.0 }, // Rear-Bottom-Right
    { x: -1.0, y: 1.0, z: -1.0 }, // Front-Top-Left
    { x: 1.0, y: 1.0, z: -1.0 }, // Front-Top-Right
    { x: -1.0, y: 1.0, z: 1.0 }, // Rear-Top-Left
    { x: 1.0, y: 1.0, z: 1.0 }, // Rear-Top-Right
  ]

  const faces = [
    [vertices[0], vertices[1], vertices[5], vertices[4]], // Front
    [vertices[2], vertices[3], vertices[7], vertices[6]], // Rear
    [vertices[0], vertices[1], vertices[3], vertices[2]], // Bottom
    [vertices[4], vertices[5], vertices[7], vertices[6]], // Top
    [vertices[0], vertices[2], vertices[6], vertices[4]], // Left
    [vertices[1], vertices[3], vertices[7], vertices[5]], // Right
  ]
    .sort(sortMax('x'))
    .sort(sortMax('y'))
    .sort(sortMax('z', true))

  const vertexShader = vertex => ({
    x: vertex.x + (vertex.z * ((1 / 2) * Math.cos(0.5))),
    y: vertex.y + (vertex.z * ((1 / 2) * Math.sin(0.5))),
  })

  const toWorld = vertex => ({
    x: vertex.x * (size / 2),
    y: vertex.y * (size / 2) * -1,
  })

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = 'white'

  faces.forEach((face) => {
    ctx.beginPath()

    face.forEach((vertex, index) => {
      const transformed = vertexShader(vertex)
      const world = toWorld(transformed)
      if (index === 0) {
        ctx.moveTo(world.x, world.y)
      } else {
        ctx.lineTo(world.x, world.y)
      }
    })

    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  })
}

draw()
