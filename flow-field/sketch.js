/* globals buildField: false, Particle: false */
const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = 400
  const height = 400
  const radius = 200
  const center = { x: width / 2, y: width / 2 }
  const particleLife = 10
  const particleCount = 10000
  const particleOrigin = {
    x: width * 0.5,
    y: height * 0.5,
  }

  const gaussian = value => Math.abs(p.randomGaussian()) * value

  const field = buildField(p, { width, height })
  let particles = Array.from({ length: particleCount }).map(() => (
    new Particle(p, {
      x: gaussian(particleOrigin.x),
      y: height - gaussian(particleOrigin.y),
      life: p.randomGaussian(particleLife),
    })
  ))

  p.setup = () => {
    p.createCanvas(width, height)
    p.colorMode(p.HSB)
    p.blendMode(p.MULTIPLY)
    // p.noLoop()
  }

  p.draw = () => {
    // field.draw()

    particles = particles.filter((particle) => {
      const { x, y } = particle.position
      const force = field.getVector(x, y)

      if (
        particle.distanceFrom(center) > radius ||
        particle.isDead()
      ) {
        return false
      }

      particle.update(force)
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
