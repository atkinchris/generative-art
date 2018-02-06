/* globals buildField: false */
const canvas = document.getElementById('canvas')

const sketch = (p) => {
  const width = 400
  const height = 400
  const field = buildField(p, { width, height })

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.RGB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
    p.pixelDensity(1)
  }

  p.draw = () => {
    field.draw()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
