const canvas = document.getElementById('canvas')

const sketch = (p) => {
  const RED = '#ec3637'

  p.setup = () => {
    p.createCanvas(canvas.offsetWidth, canvas.offsetHeight)
    p.noStroke()
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
  }

  p.draw = () => {
    p.translate(p.width / 2, p.height / 2)
    p.fill(RED)
    p.ellipse(0, 0, 100, 100)
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
