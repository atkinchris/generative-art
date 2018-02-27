const radians = degrees => degrees * (Math.PI / 180)

const drawIsoCube = (ctx, { x, y, size, angle = 30, colour }) => {
  const a = radians(angle)
  const dX = size * Math.cos(a)
  const dY = size * Math.sin(a)
  const hue = colour * 360

  const moveTo = (rX, rY) => ctx.moveTo(x + rX, y + rY)
  const lineTo = (rX, rY) => ctx.lineTo(x + rX, y + rY)
  const gradTo = (x1, y1, x2, y2) => ctx.createLinearGradient(x + x1, y + y1, x + x2, y + y2)

  // ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'

  if (!colour) {
    ctx.fillStyle = 'white'
  }

  const rFace = () => {
    if (colour) {
      const gradient = gradTo(0, 0, dX, dY)
      gradient.addColorStop(0, `hsl(${hue}, 50%, 70%)`)
      gradient.addColorStop(1, `hsl(${hue}, 50%, 50%)`)
      ctx.fillStyle = gradient
    }

    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(dX, dY)
    lineTo(dX, dY - size)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  const lFace = () => {
    if (colour) {
      const gradient = gradTo(0, 0, -dX, dY)
      gradient.addColorStop(0, `hsl(${hue}, 50%, 50%)`)
      gradient.addColorStop(1, `hsl(${hue}, 50%, 30%)`)
      ctx.fillStyle = gradient
    }

    ctx.beginPath()
    moveTo(0, 0)
    lineTo(0, size)
    lineTo(-dX, dY)
    lineTo(-dX, dY - size)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  const top = () => {
    if (colour) {
      const gradient = gradTo(0, 0, 0, -size)
      gradient.addColorStop(0, `hsl(${hue}, 50%, 70%)`)
      gradient.addColorStop(1, `hsl(${hue}, 50%, 50%)`)
      ctx.fillStyle = gradient
    }

    ctx.beginPath()
    moveTo(0, 0)
    lineTo(dX, -dY)
    lineTo(0, -size)
    lineTo(-dX, -dY)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  lFace()
  rFace()
  top()
}

export default drawIsoCube
