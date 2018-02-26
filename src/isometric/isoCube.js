const radians = degrees => degrees * (Math.PI / 180)

const drawIsoCube = (ctx, { x, y, size, angle = 30, colour }) => {
  const a = radians(angle)
  const dX = size * Math.cos(a)
  const dY = size * Math.sin(a)

  const moveTo = (rX, rY) => ctx.moveTo(x + rX, y + rY)
  const lineTo = (rX, rY) => ctx.lineTo(x + rX, y + rY)

  const rFace = () => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.fillStyle = `hsl(${colour}, 50%, 50%)`

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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.fillStyle = `hsl(${colour}, 50%, 50%)`

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
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.fillStyle = `hsl(${colour}, 50%, 50%)`

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
