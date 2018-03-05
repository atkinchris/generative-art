const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

container.appendChild(canvas)

const draw = () => {
  const width = 400
  const height = 400
  canvas.width = width
  canvas.height = height

  const leafPolygon = () => [
    { x: 30, y: 0 },
    { x: 50, y: 30, cX: 50, cY: 0 },
    { x: 30, y: 100, cX: 50, cY: 65 },
    { x: 10, y: 30, cX: 10, cY: 65 },
    { x: 30, y: 0, cX: 10, cY: 0 },
  ]

  const drawPoly = (points) => {
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(v => ctx.quadraticCurveTo(v.cX, v.cY, v.x, v.y))
    // ctx.closePath()

    ctx.fillStyle = 'lightgreen'
    ctx.fill()
    ctx.stroke()
  }

  const leaf = leafPolygon()
  drawPoly(leaf)
}

draw()
