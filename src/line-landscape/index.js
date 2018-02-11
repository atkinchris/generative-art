const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const scale = 20
  const segmentWidth = 15

  const drawLine = (y) => {
    const yN = (y / height)
    p.push()

    // p.fill(yN * 255, 32, 255)
    // p.stroke(yN * 255, 128, 64)
    p.beginShape()

    const yOff = p.noise(0, y) * 10
    p.vertex(-1, height + 1)
    p.vertex(-1, y + yOff)

    if (p.noise(y * 0.1) < 0.5) {
      const point = p.random() * yN > 0.7
        ? p.curveVertex.bind(p)
        : p.vertex.bind(p)

      for (let x = 0; x <= width + segmentWidth; x += segmentWidth) {
        const offset = Math.abs(p.noise(x, y) * 15)
        point(x, y + offset + yOff)
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
    p.blendMode(p.BLEND)
    p.noLoop()
  }

  p.draw = () => {
    for (let y = 0; y < height; y += scale) {
      drawLine(y)
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
