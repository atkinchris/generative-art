const radians = degrees => degrees * (Math.PI / 180)

const drawIsoCube = (p, { x, y, size, angle = 30 }) => {
  const a = radians(angle)
  const dX = size * Math.cos(a)
  const dY = size * Math.sin(a)

  const rFace = () => {
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(0, size)
    p.vertex(dX, dY)
    p.vertex(dX, dY - size)
    p.endShape(p.CLOSE)
  }

  const lFace = () => {
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(0, size)
    p.vertex(-dX, dY)
    p.vertex(-dX, dY - size)
    p.endShape(p.CLOSE)
  }

  const top = () => {
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(dX, -dY)
    p.vertex(0, -size)
    p.vertex(-dX, -dY)
    p.endShape(p.CLOSE)
  }

  p.push()
  p.translate(x, y)

  lFace()
  rFace()
  top()
  p.pop()
}

export default drawIsoCube
