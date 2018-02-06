const canvas = document.getElementById('canvas')

const sketch = (p) => {
  const width = 40
  const height = 40
  const scale = 10
  const noiseScale = 0.01 * scale
  const flowField = []

  const drawVector = (vector, x, y) => {
    const canvasX = (x * scale) + (scale / 2)
    const canvasY = (y * scale) + (scale / 2)
    const length = 0.5 * scale
    p.push()

    p.translate(canvasX, canvasY)
    p.rotate(vector.heading())
    p.line(0, 0, length, 0)

    p.pop()
  }

  p.setup = () => {
    p.createCanvas(width * scale, height * scale)
    // p.noStroke()
    p.colorMode(p.RGB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
    p.pixelDensity(1)
  }

  p.draw = () => {
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (width * y) + x
        const r = p.noise(x * noiseScale, y * noiseScale)
        const vector = p5.Vector.fromAngle(r * p.TWO_PI)

        flowField[index] = vector
        drawVector(vector, x, y)
      }
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
