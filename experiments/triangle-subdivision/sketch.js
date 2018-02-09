const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noFill()
    p.noLoop()
  }

  p.draw = () => {
    p.beginShape()
    p.vertex(0, 0)
    p.vertex(width, height)
    p.vertex(0, height)
    p.endShape(p.CLOSE)
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
