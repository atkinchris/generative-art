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
    if (distance(points) < width / 11) {
      stack.push(points)
      return false
    }

    const hLength = distance([points[0], points[1], points[2], points[3]])
    const hVector = p5.Vector.sub(
      p.createVector(points[2], points[3]),
      p.createVector(points[0], points[1]),
    ).normalize()
    hVector.setMag(Math.abs(p.randomGaussian(hLength / 6)))

    const lengthA = distance([points[0], points[1], points[4], points[5]])
    const lengthB = distance([points[2], points[3], points[4], points[5]])
    const midPoint = p.createVector(
      (points[0] + points[2]) / 2,
      (points[1] + points[3]) / 2,
    )

    if (lengthA === lengthB) {
      hVector.mult(p.randomGaussian())
    }

    if (lengthA < lengthB) {
      midPoint.sub(hVector)
    } else {
      midPoint.add(hVector)
    }

    stack.push([
      points[4], points[5],
      points[0], points[1],
      midPoint.x, midPoint.y,
    ])

    stack.push([
      points[4], points[5],
      points[2], points[3],
      midPoint.x, midPoint.y,
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
    if (stack.length > 0) {
      drawTriangle(stack.shift())
    } else {
      p.noLoop()
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
