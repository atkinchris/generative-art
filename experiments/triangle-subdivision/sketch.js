const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const stack = []

  const distance = points => Math.sqrt((
    ((points[2] - points[0]) ** 2) + ((points[3] - points[1]) ** 2)
  ))

  const drawTriangle = (points) => {
    if (distance(points) < p.randomGaussian(width / 10, width / 20)) {
      return
    }

    p.beginShape()
    p.vertex(points[0], points[1])
    p.vertex(points[2], points[3])
    p.vertex(points[4], points[5])
    p.endShape(p.CLOSE)

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
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noFill()

    stack.push([0, 0, width, height, width, 0])
    stack.push([0, 0, width, height, 0, height])
  }

  p.draw = () => {
    if (stack.length > 0) {
      drawTriangle(stack.shift())
      drawTriangle(stack.pop())
    } else {
      p.noLoop()
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
