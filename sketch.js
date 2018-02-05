const canvas = document.getElementById('canvas')

const sketch = (p) => {
  const rPolygon = (x, y, radius, nsides) => {
    const points = []
    const angle = p.TWO_PI / nsides

    for (let a = 0; a < p.TWO_PI; a += angle) {
      points.push({
        x: x + (Math.cos(a) * radius),
        y: y + (Math.sin(a) * radius),
        z: p.random(-1, 1),
      })
    }

    return points
  }

  const moveNearby = (point, deviation) => ({
    x: p.randomGaussian(point.x, point.z * deviation),
    y: p.randomGaussian(point.y, point.z * deviation),
    z: point.z,
  })

  const deform = (points, deviation) => points.map(point => moveNearby(point, deviation))

  const interpolate = (points, iterations = 1) => {
    const newPoints = []

    for (let iteration = 0; iteration < iterations; iteration += 1) {
      for (let i = 0; i < points.length; i += 1) {
        const p1 = points[i]
        const p2 = points[(i + 1) % points.length]
        const pMid = {
          x: (p1.x + p2.x) / 2,
          y: (p1.y + p2.y) / 2,
          z: ((p1.z + p2.z) / 2) * 0.55 * p.random(0.5, 2.5),
        }

        newPoints.push(p1)
        newPoints.push(pMid)
      }
    }

    return newPoints
  }

  const drawPoly = (points) => {
    p.beginShape()
    points.forEach(v => p.vertex(v.x, v.y))
    p.endShape(p.CLOSE)
  }

  const drawDeformedPoly = (radius, offset) => {
    const randomRadius = p.randomGaussian(radius, radius / 10)
    const baseShape = rPolygon(0, 0, randomRadius, 10)
    let polygon = baseShape

    p.translate(p.width / 2, p.height / 2)
    p.translate(offset.x, offset.y)
    p.fill(p.random(360), 80, 60, 0.01)

    const iterations = 3
    for (let iteration = 0; iteration < iterations; iteration += 1) {
      polygon = interpolate(polygon)
      polygon = deform(polygon, 5)
    }

    const layers = 30
    const deformations = 5
    for (let layer = 0; layer < layers; layer += 1) {
      let current = polygon
      for (let deformation = 0; deformation < deformations; deformation += 1) {
        current = deform(current, 8)
      }
      drawPoly(current)
    }

    p.resetMatrix()
  }


  p.setup = () => {
    p.createCanvas(canvas.offsetWidth, canvas.offsetHeight)
    p.noStroke()
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
  }

  p.draw = () => {
    const radius = 100
    const offset = radius * 0.7

    drawDeformedPoly(radius, { x: -offset, y: offset })
    drawDeformedPoly(radius, { x: offset, y: offset })
    drawDeformedPoly(radius, { x: 0, y: -offset })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
