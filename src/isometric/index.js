import drawIsoCube from './isoCube'

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const size = 30

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.noFill()
    p.noLoop()
  }

  p.draw = () => {
    drawIsoCube(p, { x: 200, y: 200, size })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
