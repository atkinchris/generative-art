const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const noiseScale = 0.001
  let stack = []

  const distance = points => Math.sqrt((
    ((points[2] - points[0]) ** 2) + ((points[3] - points[1]) ** 2)
  ))

  const subDivide = (points) => {
    if (distance(points) < p.random(width / 10, width / 20)) {
      stack.push(points)
      return false
    }

    const midPoint = [
      (points[0] + points[2]) / 2,
      (points[1] + points[3]) / 2,
    ]

    stack.push([
      points[4], points[5],
      points[0], points[1],
      midPoint[0], midPoint[1],
    ])

    stack.push([
      points[4], points[5],
      points[2], points[3],
      midPoint[0], midPoint[1],
    ])

    return true
  }

  const drawTriangle = (points) => {
    const hue = (p.noise(
      points[0] * noiseScale,
      points[1] * noiseScale,
    ) * 127) + 127

    p.fill(hue, 128, 128)
    p.stroke('white')
    p.strokeWeight(2)
    p.beginShape()
    p.vertex(points[0], points[1])
    p.vertex(points[2], points[3])
    p.vertex(points[4], points[5])
    p.endShape(p.CLOSE)
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noStroke()
    p.noFill()

    stack.push([0, 0, width, height, width, 0])
    stack.push([0, 0, width, height, 0, height])

    let result = true

    while (result) {
      result = subDivide(stack.shift())
    }

    stack = stack.sort(() => p.random(-1, 1))
  }

  p.draw = () => {
    // stack.forEach(drawTriangle)
    drawTriangle(stack.shift())
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
