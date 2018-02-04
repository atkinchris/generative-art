const TWO_PI = Math.PI * 2

const canvas = document.getElementById('canvas')

const sketch = (p) => {
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

  const subdivide = (points, { x: x1, y: y1 }, p2, depth, variance, vdiv) => {
    if (depth >= 0) {
      const midX = (x1 + p2.x) / 2
      const midY = (y1 + p2.y) / 2
      const pN = {
        // x: midX + (p.randomGaussian() * variance),
        x: midX + 10,
        // y: midY + (p.randomGaussian() * variance),
        y: midY + 10,
      }

      // subdivide(points, { x: x1, y: y1 }, pN, depth - 1, variance / vdiv, vdiv)
      points.push(pN)
      // subdivide(points, pN, p2, depth - 1, variance / vdiv, vdiv)
    }
  }

  const deform = (points, depth, variance, vdiv) => {
    const newPoints = []

    for (let i = 0; i < points.length; i += 1) {
      const p1 = points[i]
      const p2 = points[i % points.length]

      newPoints.push(p1)
      subdivide(newPoints, p1, p2, depth, variance, vdiv)
    }

    return newPoints
  }

  const RED = '#ec3637'
  const radius = 100
  const polygon = rPoly(0, 0, radius, 10)
  const deformed = deform(polygon, 5, radius / 10, 2)

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

    deformed.forEach(v => p.vertex(v.x, v.y))

    p.endShape(p.CLOSE)
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
