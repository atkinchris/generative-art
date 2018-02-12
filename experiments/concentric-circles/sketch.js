const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400

  const rPolygon = (center, radius, nsides) => {
    const points = []
    const angle = p.TWO_PI / nsides

    for (let a = 0; a < p.TWO_PI; a += angle) {
      points.push({
        x: center.x + (Math.cos(a) * p.randomGaussian(radius, 2)),
        y: center.y + (Math.sin(a) * p.randomGaussian(radius, 2)),
      })
    }

    return points
  }

  const drawSegments = (inner, outer) => {
    for (let i = 0; i < outer.length; i += 1) {
      const points = [
        outer[i],
        outer[(i + 1) % outer.length],
        inner[(i + 1) % inner.length],
        inner[i],
      ]

      p.fill(p.random(127, 196), 64, 128)
      p.beginShape()
      points.forEach(point => p.vertex(point.x, point.y))
      p.endShape(p.CLOSE)
    }
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noLoop()
  }

  p.draw = () => {
    const circles = []
    for (let i = 100; i < width * 0.5; i += 15) {
      const offsetCenter = {
        x: p.randomGaussian(width / 2, 2),
        y: p.randomGaussian(height / 2, 2),
      }

      circles.push(rPolygon(offsetCenter, i, 30))
    }

    for (let c = 1; c < circles.length; c += 1) {
      drawSegments(circles[c - 1], circles[c])
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
