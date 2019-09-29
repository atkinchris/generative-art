const canvas = document.querySelector('.container')

const sketch = p => {
  const width = 400
  const height = 400
  const size = 30
  const margin = 3
  const vertices = 6

  const rVertex = () => p.randomGaussian(0, size / 6) % size

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noFill()
    p.noLoop()
  }

  p.draw = () => {
    for (let y = margin; y < height - size; y += size + margin) {
      for (let x = margin; x < width - size; x += size + margin) {
        const verts = p.randomGaussian(vertices)
        p.push()
        p.translate(x, y)
        p.translate(size / 2, size / 2)
        p.beginShape()

        for (let v = 0; v < verts; v += 1) {
          p.vertex(rVertex(), rVertex())
        }

        p.endShape(p.CLOSE)
        p.pop()
      }
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
