/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const iterations = 100
  const field = buildField(p, { width, height })
  const particles = Array
    .from({ length: height / 2 })
    .map((_, i) => new Particle(
      p,
      p.randomGaussian(i * 2, 30),
      p.randomGaussian(i * 2, 30),
    ))

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.RGB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
    p.pixelDensity(1)
  }

  p.draw = () => {
    field.draw()

    for (let i = 0; i < iterations; i += 1) {
      particles.forEach((particle) => {
        const force = field.getVector(particle.position)

        particle.update(force)
        particle.draw()
      })
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
