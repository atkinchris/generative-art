const TWO_PI = Math.PI * 2

const canvas = document.getElementById('canvas')

const rPoly = (x, y, radius, nsides) => {
  const points = []
  const angle = TWO_PI / nsides

  for (let a = 0; a < TWO_PI; a += angle) {
    points.push({
      x: x + (Math.cos(a) * radius),
      y: y + (Math.sin(a) * radius),
    })
  }

  return points
}

const sketch = (p) => {
  const RED = '#ec3637'
  const polygon = rPoly(0, 0, 100, 10)

  p.setup = () => {
    p.createCanvas(canvas.offsetWidth, canvas.offsetHeight)
    p.noStroke()
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
  }

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2)
    p.fill(RED)

    p.beginShape()

    polygon.forEach(v => p.vertex(v.x, v.y))

    p.endShape()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
