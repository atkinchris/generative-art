import { vec3, mat4 } from 'gl-matrix'

import { buildGeometry, sortDepth } from './geometry'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

container.appendChild(canvas)

const draw = () => {
  const width = 400
  const height = 400
  const size = width / 2
  canvas.width = width
  canvas.height = height

  const { vertices, faces } = buildGeometry()

  for (let index = 0; index < vertices.length; index += 1) {
    const vertex = vertices[index]

    const transform = mat4.create()
    mat4.rotateX(transform, transform, -0.5)
    mat4.rotateY(transform, transform, 0.5)
    vec3.transformMat4(vertex, vertex, transform)
  }

  const toWorld = vertex => [
    vertex[0] * (size / 2),
    vertex[1] * (size / 2) * -1,
  ]

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = 'white'

  faces.sort(sortDepth).forEach((face) => {
    ctx.beginPath()

    face.forEach((vertex, index) => {
      const world = toWorld(vertex)
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
