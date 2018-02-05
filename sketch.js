const canvas = document.getElementById('canvas')

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerWidth)
    p.noStroke()
    p.colorMode(p.RGB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
    p.pixelDensity(1)
  }

  p.draw = () => {
    p.loadPixels()
    for (let y = 0; y < p.height; y += 1) {
      for (let x = 0; x < p.width; x += 1) {
        const r = p.noise(x * 0.01, y * 0.01) * 255
        const i = ((y * p.width) + x) * 4


        p.pixels[i + 0] = r
        p.pixels[i + 1] = r
        p.pixels[i + 2] = r
        p.pixels[i + 3] = 255
      }
    }
    p.updatePixels()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
