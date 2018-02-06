const canvas = document.getElementById('canvas')

const sketch = (p) => {
  const scale = 10
  const noiseScale = 0.01

  p.setup = () => {
    p.createCanvas(400, 400)
    // p.noStroke()
    p.colorMode(p.RGB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
    p.pixelDensity(1)
  }

  p.draw = () => {
    for (let y = 0; y < p.height; y += scale) {
      for (let x = 0; x < p.width; x += scale) {
        const r = p.noise(
          x * noiseScale,
          y * noiseScale,
        )
        const vector = p5.Vector.fromAngle(r * p.TWO_PI)

        p.push()

        p.translate(x + (scale / 2), y + (scale / 2))
        p.rotate(vector.heading())
        p.line(0, 0, scale / 2, 0)

        p.pop()
      }
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
