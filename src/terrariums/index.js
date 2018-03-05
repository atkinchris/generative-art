import { vec3, mat4 } from 'gl-matrix'

import { buildGeometry, sortDepth } from './geometry'

const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

const width = 400
const height = 400
const size = width / 2
const worldTransform = vec3.fromValues(size / 2, (size / 2) * -1, 1)

container.appendChild(canvas)

const setup = () => {
  canvas.width = width
  canvas.height = height
}

const draw = (angle = 0) => {
  const { vertices, faces } = buildGeometry()

  for (let index = 0; index < vertices.length; index += 1) {
    const vertex = vertices[index]

    const transform = mat4.create()
    mat4.translate(transform, transform, vec3.fromValues(width / 2, height / 2, 1))
    mat4.scale(transform, transform, worldTransform)
    mat4.rotateY(transform, transform, angle)
    mat4.rotateX(transform, transform, -angle)
    vec3.transformMat4(vertex, vertex, transform)
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'white'

  faces.sort(sortDepth).forEach((face) => {
    ctx.beginPath()

    face.forEach((vertex, index) => {
      if (index === 0) {
        ctx.moveTo(vertex[0], vertex[1])
      } else {
        ctx.lineTo(vertex[0], vertex[1])
      }
    })

    ctx.closePath()
    ctx.stroke()
    ctx.fill()
  })

  requestAnimationFrame(() => draw(angle + 0.05))
}

setup()

draw()
