/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const particleCount = 2000
  const center = {
    x: width / 2,
    y: width / 2,
  }

  const field = buildField(p, { width, height })
  let particles = Array.from({ length: particleCount }).map(() => {
    const x = p.randomGaussian(width / 2, width / 4)
    const y = p.randomGaussian(height / 2, height / 4)
    return new Particle(p, x, y)
  })

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    // p.noLoop()
  }

  p.draw = () => {
    // field.draw()

    particles = particles.filter((particle) => {
      const force = field.getVector(particle.position)

      particle.update(force)

      if (
        particle.distanceFrom(center) > 150 ||
        particle.isDead()
      ) {
        return false
      }

      particle.draw()
      return true
    })

    if (particles.length <= 0) {
      console.log('Stopping loop.')
      p.noLoop()
    }
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
