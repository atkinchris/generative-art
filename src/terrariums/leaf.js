import { vec3, mat4 } from 'gl-matrix'

import { buildGeometry, midPoint } from './geometry'

const size = 30

const worldScale = vec3.fromValues(size, -size, size)

const drawLeaf = (ctx, options) => {
  const {
    x = 0,
    y = 0,
    z = 0,
    scale = [1, 1, 1],
    rX = -0.4,
    rY = 0,
    rZ = 0,
  } = options

  const { vertices, faces } = buildGeometry()

  for (let index = 0; index < vertices.length; index += 1) {
    const vertex = vertices[index]

    const transform = mat4.create()
    // Move to world position
    mat4.translate(transform, transform, vec3.fromValues(x, y, z))

    // Scale to world space
    mat4.scale(transform, transform, worldScale)

    // Flip y co-ordinates for world space
    mat4.translate(transform, transform, vec3.fromValues(0, -1, 0))

    // Rotate around origin, as required
    mat4.translate(transform, transform, vec3.fromValues(0, 1, 0))
    mat4.rotateZ(transform, transform, rZ)
    mat4.translate(transform, transform, vec3.fromValues(0, -1, 0))

    // Rotate around axis, as required
    mat4.rotateY(transform, transform, rY)

    // Scale around y center, as required
    mat4.translate(transform, transform, vec3.fromValues(0, 1, 0))
    mat4.scale(transform, transform, scale)
    mat4.translate(transform, transform, vec3.fromValues(0, -1, 0))

    // Rotate around x, y center to correct vertical alignment
    mat4.translate(transform, transform, vec3.fromValues(1, 1, 0))
    mat4.rotateX(transform, transform, rX)
    mat4.translate(transform, transform, vec3.fromValues(-1, -1, 0))

    vec3.transformMat4(vertex, vertex, transform)
  }

  const colour = `rgb(0, ${Math.floor(Math.random() * 96) + 96}, 0)`

  ctx.fillStyle = colour
  ctx.strokeStyle = colour
  ctx.lineWidth = 1
  ctx.filter = 'blur(1px)'

  faces.forEach((face) => {
    ctx.beginPath()

    face.forEach((vertex, vIndex) => {
      if (vIndex === 0) {
        ctx.moveTo(vertex[0], vertex[1])
      } else {
        const next = face[(vIndex + 1) % face.length]
        const mid = midPoint(vertex, next)
        ctx.quadraticCurveTo(vertex[0], vertex[1], mid[0], mid[1])
      }
    })

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  })
}

export default drawLeaf
