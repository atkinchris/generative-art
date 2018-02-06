/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const iterations = 400
  const particleSpacing = 8
  const particleOverflow = 20

  const field = buildField(p, { width, height })
  const particleCount = Math.floor(height / particleSpacing) + (particleOverflow * 2)
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const x = 0
    const y = (i - particleOverflow) * particleSpacing
    return new Particle(p, x, y)
  })

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    p.noLoop()
  }

  p.draw = () => {
    field.draw()

    particles.forEach((particle) => {
      for (let i = 0; i < iterations; i += 1) {
        const force = field.getVector(particle.position)

        particle.update(force)
        particle.draw()
      }
    })
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
