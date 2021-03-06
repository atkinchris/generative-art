const radians = degrees => degrees * (Math.PI / 180)

const drawIsoCube = (ctx, { x, y, size, angle = 30, colour = 'white' }) => {
  const a = radians(angle)
  const dX = size * Math.cos(a)
  const dY = size * Math.sin(a)

  const moveTo = (rX, rY) => ctx.moveTo(x + rX, y + rY)
  const lineTo = (rX, rY) => ctx.lineTo(x + rX, y + rY)

  const fillSolid = () => {
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = colour
    ctx.fill()
  }

  const fillShadow = (x1, y1, x2, y2, a1, a2) => {
    const gradient = ctx.createLinearGradient(x + x1, y + y1, x + x2, y + y2)
    gradient.addColorStop(0, `rgba(${a1}, ${a1}, ${a1}, 0.75)`)
    gradient.addColorStop(1, `rgba(${a2}, ${a2}, ${a2}, 0.75)`)
    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = gradient
    ctx.fill()
  }

  const stroke = () => {
    ctx.globalCompositeOperation = 'lighten'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.stroke()
  }

  const rFace = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(dX, dY)
    lineTo(dX, dY - size)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, dX, dY, 255, 196)
    stroke()
  }

  const lFace = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(-dX, dY)
    lineTo(-dX, dY - size)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, -dX, dY, 222, 64)
    stroke()
  }

  const top = () => {
    ctx.beginPath()
    moveTo(0, 0)
    lineTo(dX, -dY)
    lineTo(0, -size)
    lineTo(-dX, -dY)
    ctx.closePath()

    fillSolid()
    fillShadow(0, 0, 0, -size, 255, 127)
    stroke()
  }

  lFace()
  rFace()
  top()
}

export default drawIsoCube
