const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const scale = 20
  const segmentWidth = 15

  const drawLine = (y) => {
    p.push()

    p.fill('#f9f8f4')
    p.beginShape()

    const yOff = p.noise(0, y) * 10
    p.vertex(-1, height + 1)
    p.vertex(-1, y + yOff)

    for (let x = 0; x <= width + segmentWidth; x += segmentWidth) {
      const offset = Math.abs(p.noise(x, y) * 15)

      if (p.noise(y) > 0.2) {
        p.curveVertex(x, y + offset + yOff)
      } else {
        p.vertex(x, y + offset + yOff)
      }
    }

    p.vertex(width + 1, y + yOff)
    p.vertex(width + 1, height + 1)
    p.endShape(p.CLOSE)

    p.pop()
  }

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noLoop()
  }

  p.draw = () => {
    for (let y = 0; y < height; y += scale) {
      drawLine(y)
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
